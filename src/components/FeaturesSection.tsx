import { Rss, Heart, Users, Flag, BookOpen } from "lucide-react";

const features = [
  { icon: Rss, title: "Faith-centered content feed", description: "Discover content that aligns with your values." },
  { icon: Heart, title: "Likes, comments, saves", description: "Engage meaningfully with posts that matter." },
  { icon: Users, title: "Faith Circle", description: "A community interaction layer for deeper fellowship." },
  { icon: Flag, title: "Content reporting system", description: "Flag anything that doesn't align with community standards." },
  { icon: BookOpen, title: "Christian community guidelines", description: "Clear, faith-based rules everyone understands." },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-section-alt">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Core Features
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need for faith-centered social engagement.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl bg-card border border-border p-6 text-center transition-shadow hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
