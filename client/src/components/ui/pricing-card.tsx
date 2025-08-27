import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  onButtonClick: () => void;
  isPopular?: boolean;
  testId?: string;
}

export default function PricingCard({
  title,
  price,
  period,
  features,
  buttonText,
  onButtonClick,
  isPopular = false,
  testId,
}: PricingCardProps) {
  return (
    <Card 
      className={`bg-card p-8 rounded-xl relative ${
        isPopular ? "border-2 border-accent" : "border border-border"
      }`}
      data-testid={testId}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
            Most Popular
          </span>
        </div>
      )}
      <CardContent className="p-0">
        <h3 className="text-2xl font-bold mb-4" data-testid={`${testId}-title`}>
          {title}
        </h3>
        <div className="text-3xl font-bold text-accent mb-6" data-testid={`${testId}-price`}>
          {price}
          <span className="text-lg text-muted-foreground font-normal">
            {period}
          </span>
        </div>
        <ul className="space-y-4 mb-8 text-muted-foreground">
          {features.map((feature, index) => (
            <li 
              key={index} 
              className="flex items-center"
              data-testid={`${testId}-feature-${index}`}
            >
              <Check className="w-5 h-5 text-accent mr-3" />
              {feature}
            </li>
          ))}
        </ul>
        <Button
          onClick={onButtonClick}
          className={`w-full font-semibold ${
            isPopular
              ? "bg-accent text-accent-foreground hover:bg-accent/90"
              : "bg-secondary text-foreground hover:bg-muted"
          }`}
          data-testid={`${testId}-button`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
