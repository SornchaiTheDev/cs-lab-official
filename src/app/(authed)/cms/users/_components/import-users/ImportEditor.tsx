import { Import, AlertTriangle } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "~/components/commons/Button";
import CodeMirror from "~/components/Editor/CodeMirror";
import {
  AlertContainer,
  AlertBody,
  AlertHeader,
} from "~/components/commons/Alert";

interface ValidationError {
  row: number;
  message: string;
}

interface Props {
  onImport: (content: string) => void;
}
function ImportEditor({ onImport }: Props) {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const VALID_ROLES = ["admin", "instructor", "student"];

  const validateCSV = (csvContent: string): ValidationError[] => {
    const errors: ValidationError[] = [];
    if (!csvContent.trim()) {
      errors.push({ row: 0, message: "Content must not be empty" });
      return errors;
    }

    const lines = csvContent.trim().split("\n");
    const headers = lines[0].toLowerCase().split(",");
    const requiredColumns = [
      "type",
      "username",
      "display_name",
      "email",
      "password",
      "roles",
    ];

    // Validate headers
    const missingColumns = requiredColumns.filter(
      (col) => !headers.includes(col),
    );
    if (missingColumns.length > 0) {
      errors.push({
        row: 0,
        message: `Missing required columns: ${missingColumns.join(", ")}`,
      });
    }

    // Get column indexes for all fields
    const columnIndexes = requiredColumns.reduce(
      (acc, col) => {
        acc[col] = headers.indexOf(col);
        return acc;
      },
      {} as Record<string, number>,
    );

    // Validate data rows
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(",");
      const type = values[columnIndexes.type]?.toLowerCase();

      // Check required fields (excluding email and password)
      const requiredFieldsForRow = [
        "type",
        "username",
        "display_name",
        "roles",
      ];
      for (const field of requiredFieldsForRow) {
        const value = values[columnIndexes[field]]?.trim();
        if (!value) {
          errors.push({
            row: i,
            message: `Row ${i}: ${field} cannot be empty`,
          });
        }

        // Validate roles format and values
        if (field === "roles" && value) {
          const roles = value
            .split("+")
            .map((role) => role.trim().toLowerCase());
          const invalidRoles = roles.filter(
            (role) => !VALID_ROLES.includes(role),
          );

          if (invalidRoles.length > 0) {
            errors.push({
              row: i,
              message: `Row ${i}: Invalid roles found: ${invalidRoles.join(", ")}. Valid roles are: ${VALID_ROLES.join(", ")} (use + to combine roles, e.g. admin+student)`,
            });
          }
        }
      }

      // Type-specific validations
      if (type === "credential" && values[columnIndexes.email]?.trim()) {
        errors.push({
          row: i,
          message: `Row ${i}: Email must be empty for credential type`,
        });
      }

      if (type === "oauth" && values[columnIndexes.password]?.trim()) {
        errors.push({
          row: i,
          message: `Row ${i}: Password must be empty for oauth type`,
        });
      }
    }

    return errors;
  };

  const handleOnImport = () => {
    const validationErrors = validateCSV(content);
    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      try {
        onImport(content);
      } catch {}
    }
  };

  const handleOnChange = useCallback((value: string) => {
    setContent(value);
    setErrors([]);
  }, []);

  return (
    <>
      <div className="h-[300px] border border-(--gray-4) rounded-lg overflow-hidden">
        <CodeMirror
          className="h-full"
          onChange={handleOnChange}
          placeholder="type,username,display_name,email,password,roles"
          value={content}
        />
      </div>
      {errors.length > 0 && (
        <AlertContainer className="max-h-[200px] overflow-auto">
          <AlertHeader icon={<AlertTriangle size="1.2rem" />}>
            CSV Validation Errors
          </AlertHeader>
          <AlertBody>
            <ul className="list-disc pl-4 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </AlertBody>
        </AlertContainer>
      )}
      <Button onClick={handleOnImport} className="w-full mt-4" variant="action">
        <Import size="1rem" />
        Import
      </Button>
    </>
  );
}

export default ImportEditor;
