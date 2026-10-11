import { Hammer, Sparkles, Zap, Paintbrush, Wrench, Sprout, Shirt } from 'lucide-react';
const icons = { Hammer, Sparkles, Zap, Paintbrush, Wrench, Sprout, Shirt };
export default function ServiceIcon({ name, ...props }) {
  const Icon = icons[name] || Hammer;
  return <Icon aria-hidden="true" {...props} />;
}
