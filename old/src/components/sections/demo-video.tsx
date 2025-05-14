import { Section } from "../section";
import HeroVideoDialog from "../ui/hero-video-dialog";

export function DemoVideo() {
  return (
    <Section id="demo">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="relative">
          <HeroVideoDialog
            className="dark:hidden block"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/JMYqvPTIE2E?si=ZfLPcjGuaBvcKIqT"
            thumbnailSrc="/blackboard.png"
            thumbnailAlt="Gym Profile Demo"
          />
          <HeroVideoDialog
            className="hidden dark:block"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/JMYqvPTIE2E?si=ZfLPcjGuaBvcKIqT"
            thumbnailSrc="/blackboard.png"
            thumbnailAlt="Gym Profile Demo"
          />
          <h3 className="text-xl font-semibold mt-4 text-center">For Gyms</h3>
        </div>

        <div className="relative">
          <HeroVideoDialog
            className="dark:hidden block"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/JMYqvPTIE2E?si=ZfLPcjGuaBvcKIqT"
            thumbnailSrc="/blackboard.png"
            thumbnailAlt="Athlete Profile Demo"
          />
          <HeroVideoDialog
            className="hidden dark:block"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/JMYqvPTIE2E?si=ZfLPcjGuaBvcKIqT"
            thumbnailSrc="/blackboard.png"
            thumbnailAlt="Athlete Profile Demo"
          />
          <h3 className="text-xl font-semibold mt-4 text-center">
            For Athletes
          </h3>
        </div>
      </div>
    </Section>
  );
}
