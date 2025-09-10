import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Upload, Trash2, FileUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Faculty {
  id: string;
  name: string;
  subjects: string;
  availability: string;
}

interface Course {
  id: string;
  courseCode: string;
  credits: string;
  type: string;
}

interface Room {
  id: string;
  roomName: string;
  capacity: string;
}

const UploadData = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([
    { id: "1", name: "Dr. John Smith", subjects: "Mathematics, Statistics", availability: "Mon-Fri 9-5" },
    { id: "2", name: "Prof. Sarah Johnson", subjects: "Physics, Applied Physics", availability: "Mon-Wed-Fri 10-4" },
  ]);

  const [courses, setCourses] = useState<Course[]>([
    { id: "1", courseCode: "MATH101", credits: "4", type: "Core" },
    { id: "2", courseCode: "PHYS201", credits: "3", type: "Elective" },
  ]);

  const [rooms, setRooms] = useState<Room[]>([
    { id: "1", roomName: "Room A-101", capacity: "60" },
    { id: "2", roomName: "Lab B-201", capacity: "30" },
  ]);

  const addFaculty = () => {
    const newFaculty: Faculty = {
      id: Date.now().toString(),
      name: "",
      subjects: "",
      availability: "",
    };
    setFaculty([...faculty, newFaculty]);
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      courseCode: "",
      credits: "",
      type: "",
    };
    setCourses([...courses, newCourse]);
  };

  const addRoom = () => {
    const newRoom: Room = {
      id: Date.now().toString(),
      roomName: "",
      capacity: "",
    };
    setRooms([...rooms, newRoom]);
  };

  const updateFaculty = (id: string, field: keyof Faculty, value: string) => {
    setFaculty(faculty.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const updateRoom = (id: string, field: keyof Room, value: string) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const deleteFaculty = (id: string) => {
    setFaculty(faculty.filter(f => f.id !== id));
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const deleteRoom = (id: string) => {
    setRooms(rooms.filter(r => r.id !== id));
  };

  const handleSave = () => {
    toast({
      title: "Data Saved Successfully!",
      description: "All your data has been saved to the system.",
    });
  };

  const simulateCSVUpload = (type: string) => {
    const dummyData = {
      faculty: [
        { id: Date.now().toString(), name: "Dr. Emily Brown", subjects: "Chemistry, Organic Chemistry", availability: "Tue-Thu 11-6" },
        { id: (Date.now() + 1).toString(), name: "Prof. Michael Davis", subjects: "Computer Science, AI", availability: "Mon-Fri 9-3" },
      ],
      courses: [
        { id: Date.now().toString(), courseCode: "CHEM301", credits: "3", type: "Core" },
        { id: (Date.now() + 1).toString(), courseCode: "CS401", credits: "4", type: "Major" },
      ],
      rooms: [
        { id: Date.now().toString(), roomName: "Chemistry Lab C-301", capacity: "25" },
        { id: (Date.now() + 1).toString(), roomName: "Computer Lab D-401", capacity: "40" },
      ],
    };

    if (type === "faculty") setFaculty(dummyData.faculty);
    if (type === "courses") setCourses(dummyData.courses);
    if (type === "rooms") setRooms(dummyData.rooms);

    toast({
      title: "CSV Uploaded!",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} data has been imported successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Upload Data
        </h1>
        <p className="text-muted-foreground">
          Manage faculty, courses, and room information for timetable generation
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Tabs defaultValue="faculty" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
          </TabsList>

          <TabsContent value="faculty" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Faculty Members</CardTitle>
                    <CardDescription>Manage faculty information and availability</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => simulateCSVUpload("faculty")} variant="outline" size="sm">
                      <FileUp className="w-4 h-4 mr-2" />
                      Upload CSV
                    </Button>
                    <Button onClick={addFaculty} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Faculty
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Subjects</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {faculty.map((f) => (
                      <TableRow key={f.id}>
                        <TableCell>
                          <Input
                            value={f.name}
                            onChange={(e) => updateFaculty(f.id, "name", e.target.value)}
                            placeholder="Faculty name"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={f.subjects}
                            onChange={(e) => updateFaculty(f.id, "subjects", e.target.value)}
                            placeholder="Subjects taught"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={f.availability}
                            onChange={(e) => updateFaculty(f.id, "availability", e.target.value)}
                            placeholder="Available hours"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteFaculty(f.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Course Information</CardTitle>
                    <CardDescription>Manage course codes, credits, and types</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => simulateCSVUpload("courses")} variant="outline" size="sm">
                      <FileUp className="w-4 h-4 mr-2" />
                      Upload CSV
                    </Button>
                    <Button onClick={addCourse} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Course
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Code</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell>
                          <Input
                            value={c.courseCode}
                            onChange={(e) => updateCourse(c.id, "courseCode", e.target.value)}
                            placeholder="Course code"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={c.credits}
                            onChange={(e) => updateCourse(c.id, "credits", e.target.value)}
                            placeholder="Credits"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={c.type}
                            onChange={(e) => updateCourse(c.id, "type", e.target.value)}
                            placeholder="Course type"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteCourse(c.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rooms" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Room Information</CardTitle>
                    <CardDescription>Manage classroom and lab details</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => simulateCSVUpload("rooms")} variant="outline" size="sm">
                      <FileUp className="w-4 h-4 mr-2" />
                      Upload CSV
                    </Button>
                    <Button onClick={addRoom} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Room
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room Name</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rooms.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>
                          <Input
                            value={r.roomName}
                            onChange={(e) => updateRoom(r.id, "roomName", e.target.value)}
                            placeholder="Room name"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={r.capacity}
                            onChange={(e) => updateRoom(r.id, "capacity", e.target.value)}
                            placeholder="Capacity"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteRoom(r.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-gradient-primary hover:shadow-elegant">
            <Upload className="w-4 h-4 mr-2" />
            Save All Data
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadData;