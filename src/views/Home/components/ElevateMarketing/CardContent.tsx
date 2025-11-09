import { Typography } from '@mui/material';

interface Props {
  title?: string;
  description?: string;
  index: number;
  totalCards: number;
}

export default function CardContent({ title, description, index, totalCards }: Props) {
  return (
    <div className={`${index !== totalCards - 1 ? '' : 'max-w-96 text-left'} flex flex-col gap-4`}>
      <Typography variant="h5">{title}</Typography>
      <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
    </div>
  );
}
