export interface StartupData {
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  tam: string;
  sam: string;
  som: string;
  team: { name: string; title: string; bio: string }[];
  testimonial: { name: string; role: string; quote: string };
  traction: {
    metric1_label: string; metric1_value: string;
    metric2_label: string; metric2_value: string;
    metric3_label: string; metric3_value: string;
  };
  funding: string;
  pitch_line: string;
  accent_color: string;
}
