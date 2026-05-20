"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FaTrash, FaFileExport, FaCopy, FaEdit } from "react-icons/fa";
import { useState } from "react";
import { PrivateAccessCodeType } from "@/types/adminTypes/assignments/examTypes";
import {
  deletePrivateAccessCodes,
  deleteSpecificPrivateAccessCode,
  updatePrivateAccessCode,
} from "@/lib/action/assignment_action";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PrivateAccessCodeTable = ({
  data,
  refetch,
}: {
  data: PrivateAccessCodeType[];
  refetch: () => void;
}) => {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [editingStudent, setEditingStudent] =
    useState<PrivateAccessCodeType | null>(null);
  const [newEmail, setNewEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(data.map((student) => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId: number, checked: boolean) => {
    if (checked) {
      setSelectedStudents((prev) => [...prev, studentId]);
    } else {
      setSelectedStudents((prev) => prev.filter((id) => id !== studentId));
    }
  };

  const handleDelete = async () => {
    if (selectedStudents.length === 0) return;

    try {
      const idsToDelete = selectedStudents.map((id) => Number(id));
      await deletePrivateAccessCodes(idsToDelete);
      refetch();
      setSelectedStudents([]);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete selected codes");
      console.error("Error deleting codes:", error);
    }
  };

  const handleDeleteSingle = async (id: number) => {
    try {
      await deleteSpecificPrivateAccessCode(id);
      toast.success("Code deleted successfully");
      refetch();
      setSelectedStudents((prev) =>
        prev.filter((studentId) => studentId !== id)
      );
    } catch (error: any) {
      toast.error(error.message || "Failed to delete code");
      console.error("Error deleting code:", error);
    }
  };

  const handleEditClick = (student: PrivateAccessCodeType) => {
    setEditingStudent(student);
    setNewEmail(student.email || "");
    setIsDialogOpen(true);
  };

  const handleUpdateEmail = async () => {
    if (!editingStudent) return;

    setIsUpdating(true);
    try {
      await updatePrivateAccessCode(editingStudent.id, newEmail);
      toast.success("Email updated successfully");
      refetch();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update email");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-4 -mt-20">
      <div className="flex items-center gap-4 p-4">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={selectedStudents.length === 0}
        >
          <FaTrash className="mr-2" />
          Delete Selected ({selectedStudents.length})
        </Button>

        {selectedStudents.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {selectedStudents.length} selected
          </span>
        )}
      </div>

      <div className="rounded-md border p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={
                    selectedStudents?.length === data?.length &&
                    data?.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>ID Number</TableHead>
              <TableHead>Access Code</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={(checked) =>
                      handleSelectStudent(student.id, checked as boolean)
                    }
                    aria-label={`Select student ${student.id}`}
                  />
                </TableCell>
                <TableCell>{student.id_number}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{student.access_code}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => {
                        navigator.clipboard.writeText(student.access_code);
                        toast.success("Code copied to clipboard");
                      }}
                    >
                      <FaCopy className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  {student.email || (
                    <span className="text-muted-foreground">None</span>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(student.created_at).toLocaleString()}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditClick(student)}
                  >
                    <FaEdit className="text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSingle(student.id)}
                  >
                    <FaTrash className="text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Student Email</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>ID Number</Label>
              <Input value={editingStudent?.id_number || ""} disabled />
            </div>
            <div>
              <Label>Current Email</Label>
              <Input value={editingStudent?.email || "None"} disabled />
            </div>
            <div>
              <Label>New Email</Label>
              <Input
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateEmail} disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Email"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PrivateAccessCodeTable;
