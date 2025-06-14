export interface Course {
  id: string;
  name: string;
  creators: Creator[];
}

interface Creator {
  id: string;
  display_name: string;
  profile_image: string | null;
}
