import WaitlistForm from "./WaitlistForm";

const CTASection = () => {
  return (
    <section id="waitlist-bottom" className="py-16 md:py-24 bg-cta-gradient">
      <div className="container max-w-xl text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-10">
          Still interested? Get early access.
        </h2>
        <div className="rounded-2xl bg-card p-6 md:p-8 shadow-2xl">
          <WaitlistForm simplified={true} />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
