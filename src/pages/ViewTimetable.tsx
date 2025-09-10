import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Table, Calendar, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ViewTimetable = () => {
  const [timetableData, setTimetableData] = useState<any>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<string>("all");
  const [selectedBatch, setSelectedBatch] = useState<string>("all");
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);

  useEffect(() => {
    // Load timetable data from localStorage
    const stored = localStorage.getItem('generatedTimetable');
    if (stored) {
      const data = JSON.parse(stored);
      setTimetableData(data);
      setFilteredEvents(data.events);
    }
  }, []);

  useEffect(() => {
    if (timetableData) {
      let filtered = timetableData.events;
      
      if (selectedFaculty !== "all") {
        filtered = filtered.filter((event: any) => 
          event.title.toLowerCase().includes(selectedFaculty.toLowerCase())
        );
      }
      
      if (selectedBatch !== "all") {
        // In a real app, this would filter by actual batch data
        filtered = filtered.filter((event: any) => 
          event.title.includes(selectedBatch)
        );
      }
      
      setFilteredEvents(filtered);
    }
  }, [selectedFaculty, selectedBatch, timetableData]);

  const handleExportPDF = () => {
    // Simulate PDF export
    const link = document.createElement('a');
    link.href = '/sample-timetable.pdf'; // This would be a real PDF in production
    link.download = 'timetable.pdf';
    link.click();
    
    toast({
      title: "Export Successful!",
      description: "Timetable has been exported as PDF.",
    });
  };

  const handleExportExcel = () => {
    // Simulate Excel export
    const link = document.createElement('a');
    link.href = '/sample-timetable.xlsx'; // This would be a real Excel file in production
    link.download = 'timetable.xlsx';
    link.click();
    
    toast({
      title: "Export Successful!",
      description: "Timetable has been exported as Excel file.",
    });
  };

  if (!timetableData) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            View Timetable
          </h1>
          <p className="text-muted-foreground">
            Browse and export your generated timetables
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="text-xl text-muted-foreground mb-2">
                No Timetable Generated
              </CardTitle>
              <CardDescription>
                Please generate a timetable first to view it here.
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">
          View Timetable
        </h1>
        <p className="text-muted-foreground">
          Browse and export your generated timetables
        </p>
      </motion.div>

      {/* Filters and Export Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Faculty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Faculty</SelectItem>
                <SelectItem value="Dr. John Smith">Dr. John Smith</SelectItem>
                <SelectItem value="Prof. Sarah Johnson">Prof. Sarah Johnson</SelectItem>
                <SelectItem value="Dr. Emily Brown">Dr. Emily Brown</SelectItem>
                <SelectItem value="Prof. Michael Davis">Prof. Michael Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={selectedBatch} onValueChange={setSelectedBatch}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by Student Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>
              <SelectItem value="2024">Batch 2024</SelectItem>
              <SelectItem value="2023">Batch 2023</SelectItem>
              <SelectItem value="2022">Batch 2022</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-2">
          <Button onClick={handleExportPDF} variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={handleExportExcel} variant="outline" size="sm">
            <Table className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </motion.div>

      {/* Timetable Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {timetableData.stats.totalClasses}
            </div>
            <p className="text-muted-foreground text-sm">Total Classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">
              {timetableData.stats.facultyUtilization}%
            </div>
            <p className="text-muted-foreground text-sm">Faculty Utilization</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">
              {timetableData.stats.roomUtilization}%
            </div>
            <p className="text-muted-foreground text-sm">Room Utilization</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">
              {timetableData.stats.conflicts}
            </div>
            <p className="text-muted-foreground text-sm">Conflicts</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Calendar View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Generated Timetable</CardTitle>
            <CardDescription>
              Interactive calendar view of your optimized schedule
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-background rounded-lg p-4">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={filteredEvents}
                height="600px"
                slotMinTime="08:00:00"
                slotMaxTime="18:00:00"
                allDaySlot={false}
                eventDidMount={(info) => {
                  // Add room information to event display
                  const roomInfo = info.event.extendedProps.room;
                  if (roomInfo) {
                    info.el.setAttribute('title', `${info.event.title}\nRoom: ${roomInfo}`);
                  }
                }}
                eventClassNames="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ViewTimetable;