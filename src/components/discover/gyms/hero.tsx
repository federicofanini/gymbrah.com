export function Hero() {
  return (
    <div className="text-center mb-8 md:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2] text-balance mb-4">
        <span className="relative inline-block px-1">
          Find your perfect gym
          <span className="hidden md:block absolute -bottom-1 left-0 w-full h-2 md:h-3 bg-cyan-400 -rotate-1 -z-10" />
        </span>
        <br />
        <span className="text-sm md:text-md text-muted-foreground font-medium tracking-normal">
          Discover top-rated gyms, fitness studios, and personal trainers in
          your area
        </span>
      </h2>
    </div>
  );
}
