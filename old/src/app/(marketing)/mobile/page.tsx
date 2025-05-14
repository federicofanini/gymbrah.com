import { Header } from "@/components/sections/header";
import { Section } from "@/components/section";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { Smartphone, Chrome, Download, CheckCircle, Phone } from "lucide-react";
import { getSubscriberCount } from "@/actions/subscribe-action";
import { Loader2 } from "lucide-react";

export default async function MobileApp() {
  const subscriberCountResponse = await getSubscriberCount();
  const subscriberCount = subscriberCountResponse.success ? (
    subscriberCountResponse.data.count
  ) : (
    <Loader2 className="w-4 h-4 animate-spin" />
  );
  return (
    <div className="flex flex-col gap-4">
      <Header />
      <Section id="install" title="Install GymBrah as a Mobile App">
        <div className="grid grid-cols-1 md:grid-cols-2 border-x border-t">
          {/* iOS Instructions */}
          <div className="p-8 border-b md:border-r bg-blue-500/10 hover:bg-blue-500/20 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <Icons.apple className="w-6 h-6" />
              <h3 className="text-2xl font-bold font-mono">For iPhone (iOS)</h3>
            </div>
            <div className="flex flex-col items-center mb-6">
              <Image
                src="/icons/icon-512x512.png"
                alt="GymBrah App Icon"
                width={80}
                height={80}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <ul className="space-y-6 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Image
                  src="/icons/safari.svg"
                  alt="Safari Icon"
                  width={20}
                  height={20}
                />
                <span className="leading-relaxed">
                  Open <span className="font-mono">Safari</span> and visit{" "}
                  <span className="font-semibold text-primary">
                    gymbrah.com
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Icons.iosShare className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <span className="leading-relaxed">
                  Tap the{" "}
                  <span className="font-semibold text-primary">Share</span>{" "}
                  button and scroll to find{" "}
                  <span className="font-semibold text-primary">
                    Add to Home Screen
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <span className="leading-relaxed">
                  Tap <span className="font-semibold text-primary">Add</span> to
                  confirm and access GymBrah from your home screen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <span className="leading-relaxed">
                  It will work as a{" "}
                  <span className="font-semibold text-primary">native app</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Android Instructions */}
          <div className="p-8 border-b bg-green-500/10 hover:bg-green-500/20 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <Icons.android className="w-6 h-6" />
              <h3 className="text-2xl font-bold font-mono">For Android</h3>
            </div>
            <div className="flex flex-col items-center mb-6">
              <Image
                src="/icons/icon-512x512.png"
                alt="GymBrah App Icon"
                width={80}
                height={80}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <ul className="space-y-6 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Icons.chrome className="w-5 h-5" />
                <span className="leading-relaxed">
                  Open <span className="font-mono">Chrome</span> and visit{" "}
                  <span className="font-semibold text-primary">
                    gymbrah.com
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Download className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="leading-relaxed">
                  Tap the{" "}
                  <span className="font-semibold text-primary">menu</span> (⋮)
                  and select{" "}
                  <span className="font-semibold text-primary">
                    Install app
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="leading-relaxed">
                  Tap{" "}
                  <span className="font-semibold text-primary">Install</span> to
                  add GymBrah to your home screen with full offline support
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="leading-relaxed">
                  It will work as a{" "}
                  <span className="font-semibold text-primary">native app</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Section>
      <CTA subscriberCount={subscriberCount} />
      <Footer />
    </div>
  );
}
