import WaitlistForm from "./WaitlistForm";

const HeroSection = () => {
  return (
    <section className="bg-hero-gradient pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container max-w-[1100px]">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="text-center md:text-left">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground mb-6">
              A Social Platform That Puts{" "}
              <span className="text-gradient">Christian Faith</span> First.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-2 font-medium">
              Create. Share. Engage.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
              A modern, safe space built for faith-centered community.
            </p>
            
            <div className="hidden md:block mt-8 flex items-center gap-2 justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-primary-tint border-2 border-background flex items-center justify-center text-xs font-semibold text-primary"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Early believers joining the movement.
              </p>
            </div>
          </div>
          
          <div className="w-full max-w-md mx-auto md:max-w-none">
            <div className="rounded-2xl bg-card p-6 md:p-8 shadow-2xl border border-border">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
