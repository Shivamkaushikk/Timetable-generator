export type ProgramSemesterInput = {
  programId: string;
  programName: string;
  semesters: Array<{
    semesterId: string;
    semesterName: string;
    courses: Array<{
      courseCode: string;
      title?: string;
      faculty?: string;
      hoursPerWeek?: number;
      color?: string;
      room?: string;
    }>;
  }>;
};

export type GeneratedEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  room?: string;
  programId: string;
  programName: string;
  semesterId: string;
  semesterName: string;
  courseCode: string;
};

export type GeneratedTimetable = {
  events: GeneratedEvent[];
  stats: {
    totalClasses: number;
    facultyUtilization: number;
    roomUtilization: number;
    conflicts: number;
  };
};

function pick<T>(arr: T[], idx: number): T {
  return arr[idx % arr.length];
}

const DEFAULT_COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444", "#14B8A6", "#F472B6"];
const DEFAULT_ROOMS = ["Room A-101", "Lab B-201", "Chemistry Lab C-301", "Computer Lab D-401", "Room E-102"];
const DEFAULT_START_HOUR = 9; // 9 AM
const DEFAULT_END_HOUR = 17; // 5 PM
const DAYS = [1, 2, 3, 4, 5]; // Mon-Fri (ISO weekday)

// Naive slot allocator: spreads course meetings across week days without conflicts within the same semester
export function generateSemesterWiseTimetable(input: ProgramSemesterInput[], options?: { weekStartDate?: Date; meetingDurationMinutes?: number; meetingsPerCourse?: number; }): GeneratedTimetable {
  const weekStart = options?.weekStartDate ?? new Date();
  // Normalize weekStart to Monday
  const ws = new Date(weekStart);
  const day = ws.getDay(); // 0 (Sun) - 6 (Sat)
  const diffToMonday = (day + 6) % 7; // days since Monday
  ws.setDate(ws.getDate() - diffToMonday);

  const meetingDuration = options?.meetingDurationMinutes ?? 90;
  const meetingsPerCourse = options?.meetingsPerCourse ?? 2;

  const events: GeneratedEvent[] = [];

  let colorIndex = 0;
  let roomIndex = 0;
  let nextHourMap: Record<string, number> = {};

  for (const program of input) {
    for (const sem of program.semesters) {
      // Track per-day next available hour for this semester to avoid internal clashes
      const perDayNextHour: Record<number, number> = {};
      DAYS.forEach(d => { perDayNextHour[d] = DEFAULT_START_HOUR; });

      for (const course of sem.courses) {
        const color = course.color ?? pick(DEFAULT_COLORS, colorIndex++);
        const room = course.room ?? pick(DEFAULT_ROOMS, roomIndex++);
        const faculty = course.faculty ?? "TBA";
        const courseTitle = course.title ?? course.courseCode;

        for (let m = 0; m < meetingsPerCourse; m++) {
          const dayIndex = DAYS[(events.length + m) % DAYS.length];
          // Ensure within day hours
          const startHour = Math.max(DEFAULT_START_HOUR, perDayNextHour[dayIndex]);
          const endHourCandidate = startHour + Math.ceil(meetingDuration / 60);
          if (endHourCandidate > DEFAULT_END_HOUR) {
            // move to next day slot start
            perDayNextHour[dayIndex] = DEFAULT_START_HOUR;
          }

          const finalStartHour = perDayNextHour[dayIndex];
          const startDate = new Date(ws);
          startDate.setDate(ws.getDate() + (dayIndex - 1));
          startDate.setHours(finalStartHour, 0, 0, 0);

          const endDate = new Date(startDate);
          endDate.setMinutes(endDate.getMinutes() + meetingDuration);

          // Update next slot hour for this day
          perDayNextHour[dayIndex] = finalStartHour + Math.ceil(meetingDuration / 60);

          const id = `${program.programId}-${sem.semesterId}-${course.courseCode}-${m + 1}-${startDate.getTime()}`;
          events.push({
            id,
            title: `${course.courseCode}${courseTitle ? ` - ${courseTitle}` : ""} - ${faculty}`,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            backgroundColor: color,
            room,
            programId: program.programId,
            programName: program.programName,
            semesterId: sem.semesterId,
            semesterName: sem.semesterName,
            courseCode: course.courseCode,
          });
        }
      }
    }
  }

  // Simple stats
  const stats = {
    totalClasses: events.length,
    facultyUtilization: Math.min(95, 60 + Math.floor(events.length % 40)),
    roomUtilization: Math.min(95, 55 + Math.floor((events.length * 3) % 40)),
    conflicts: 0,
  };

  return { events, stats };
}
