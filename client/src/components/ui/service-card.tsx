import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  onButtonClick: () => void;
  testId?: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  features,
  buttonText,
  onButtonClick,
  testId,
}: ServiceCardProps) {
  return (
    <Card className="bg-card p-8 rounded-xl border border-border service-hover" data-testid={testId}>
      <CardContent className="p-0">
        <div className="w-16 h-16 bg-accent rounded-lg mb-6 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4" data-testid={`${testId}-title`}>
          {title}
        </h3>
        <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`${testId}-description`}>
          {description}
        </p>
        <ul className="space-y-3 mb-6 text-muted-foreground">
          {features.map((feature, index) => (
            <li 
              key={index} 
              className="flex items-center"
              data-testid={`${testId}-feature-${index}`}
            >
              <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
              {feature}
            </li>
          ))}
        </ul>
        <Button
          onClick={onButtonClick}
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
          data-testid={`${testId}-button`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
