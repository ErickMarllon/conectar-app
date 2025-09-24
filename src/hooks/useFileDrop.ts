import { useCallback } from 'react';
import type { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';

export function useFileDrop<T extends FieldValues>() {
  const handleFileDrop = useCallback(
    (acceptedFiles: File[], fieldName: Path<T>, setValue: UseFormSetValue<T>) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue(fieldName, newFile as PathValue<T, Path<T>>, { shouldValidate: true });
      }
    },
    [],
  );

  return { handleFileDrop };
}
