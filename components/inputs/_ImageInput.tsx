import { Typography, Box, Button } from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import capitalizeCamelCase from "utils/capitalizeCamelCase";

interface Image {
  url: string | null;
  file: File | null;
}

export interface ImageInputField {
  type: "image";
  name: string;
  max: number;
  validator?: (value: Image[]) => string | undefined;
  label?: string;
}

interface ImageInputChange {
  type: "add" | "remove";
  value: Image;
}

interface ImageInputProps {
  value: Image[];
  field: ImageInputField;
  onChange: (name: string, value: ImageInputChange) => void;
  error?: string;
  disabled?: boolean;
}

interface UseImageUpload {
  images: Image[];
  imagesToShow: Image[];
  handleChange: (file: File, url: string, index: number) => void;
  handleRemove: (index: number) => void;
}

export const useImageUpload = (
  initalUrls: string[] = [],
  maxImages = initalUrls.length === 0 ? 1 : initalUrls.length
): UseImageUpload => {
  const [images, setImages] = useState<Image[]>(
    Array.from<unknown, Image>({ length: maxImages }, (_, i) => ({
      url: initalUrls[i] ?? null,
      file: null,
    }))
  );
  const imagesToShow = useMemo(() => {
    const img: Image[] = [];

    for (let i = 0; i < images.length; i++) {
      img.push(images[i]);
      if (images[i].url === null) break;
    }

    return img;
  }, [images]);

  const sortImages = useCallback(
    (oldImages: Image[]) => {
      const newImages = Array.from<unknown, Image>(
        { length: maxImages },
        () => ({
          url: null,
          file: null,
        })
      );
      let newIndex = 0;
      oldImages.forEach((img) => {
        if (img.url !== null) {
          newImages[newIndex++] = img;
        }
      });

      return newImages;
    },
    [maxImages]
  );
  const handleChange = useCallback(
    (file: File, url: string, index: number) => {
      setImages((state) => {
        const oldImages = state;
        oldImages[index] = { url, file };
        return sortImages(oldImages);
      });
    },
    [setImages, sortImages]
  );

  const handleRemove = useCallback(
    (index: number) => {
      setImages((state) => {
        const oldImages = state;
        oldImages[index] = { url: null, file: null };
        return sortImages(oldImages);
      });
    },
    [setImages, sortImages]
  );

  return {
    images,
    imagesToShow,
    handleChange,
    handleRemove,
  };
};

// export default useImageUpload;

const ImageInput = (props: ImageInputProps) => {
  const { onChange, value, field, error, disabled } = props;

  return (
    <>
      <Typography color={error ? "error" : "inherit"}>
        {field.label ?? capitalizeCamelCase(field.name)}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {value.map((image, i) => (
          <div key={image.url ?? i}>
            <Button variant="outlined" component="label" disabled={disabled}>
              <input
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                // onChange={(e) => onChange(field.name, e.target.files)}
                hidden
                disabled={disabled}
              />
            </Button>
          </div>
        ))}
      </Box>
      <Typography variant="caption" color="error" sx={{ mt: 1, mb: 2 }}>
        {error}
      </Typography>
    </>
  );
};

export default ImageInput;
