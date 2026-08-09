import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

export const metadata: Metadata = generateMetadata({
  title: "Privacy Policy",
  description: "Learn about how Impulso Co. collects, uses, and protects your personal information.",
  keywords: "privacy policy, data protection, personal information, GDPR, Impulso Co.",
  pathname: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const lastUpdated = "April 5, 2025";

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

        <div className="prose dark:prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            At Impulso Co., we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>

          <h2>The Data We Collect About You</h2>
          <p>
            Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul>
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
            <li><strong>Chat Data</strong> includes the messages you exchange with our AI chat assistant, and any contact details you choose to share in that conversation. See &quot;Our AI Chat Assistant&quot; below.</li>
          </ul>

          <h2>Our AI Chat Assistant</h2>
          <p>
            Our website offers a chat assistant called Sam. It is powered by artificial intelligence, not a human, and we tell you so in the chat window itself. If you would rather speak to a person, just ask and we will take over the conversation.
          </p>
          <p><strong>What we store when you use the chat:</strong></p>
          <ul>
            <li>The full conversation, including every message you send and every reply you receive.</li>
            <li>Any contact details you choose to share, such as your name, email address or phone number. These are never required, and the assistant will still help you if you prefer not to give them.</li>
            <li>Technical context: the page you started the chat from, the page that referred you, your browser type and your language.</li>
            <li>A one-way hashed version of your IP address. We do not store the address itself. The hash exists solely to prevent abuse and to keep the service available.</li>
          </ul>
          <p>
            <strong>Why we store it:</strong> to answer your question, to follow up if you ask us to, to schedule a meeting when you request one, and to review and improve the quality of the assistant. Our legal basis is our legitimate interest in responding to enquiries about our services, and, where you ask us to arrange something, taking steps at your request prior to entering into a contract.
          </p>
          <p>
            <strong>Who else sees it:</strong> your messages are sent to Google&apos;s Gemini API, which generates the replies. Google acts as a processor and does not use this content to train its models. The assistant has no access to our customer database or to any other visitor&apos;s conversation. If you ask us to schedule a meeting, we create a calendar entry in Google Calendar and send you a confirmation and a reminder by email through our email provider, Resend.
          </p>
          <p>
            <strong>How long we keep it:</strong> conversations are retained for up to 12 months so we can follow up and handle any questions about work we discussed, after which they are deleted. You can ask us to delete your conversation sooner at any time by emailing info@impulsoco.nl.
          </p>
          <p>
            The chat stores a session identifier in your browser&apos;s session storage so your conversation survives while you browse the site. It is not a tracking cookie, it is not shared with anyone, and it disappears when you close the tab.
          </p>
          <p>
            Please do not share sensitive personal information, passwords or confidential business data in the chat. If you do so by accident, email us and we will remove it.
          </p>
          <p>
            <strong>Bot protection.</strong> To keep the chat available and prevent automated abuse, it is protected by Cloudflare Turnstile. Turnstile runs invisibly in the background, so you will not see a puzzle or a checkbox. It checks signals from your browser to confirm you are a real visitor, and Cloudflare does not use this to track you across websites. Cloudflare&apos;s handling of that data is described in the{" "}
            <a href="https://www.cloudflare.com/turnstile-privacy-policy/" target="_blank" rel="noopener noreferrer">Cloudflare Turnstile Privacy Addendum</a>, which forms part of this policy.
          </p>

          <h2>How We Use Your Personal Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
          </p>

          <h2>Data Retention</h2>
          <p>
            We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.
          </p>

          <h2>Your Legal Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
          <ul>
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>

          <h2>Third-Party Links</h2>
          <p>
            This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
          </p>

          <h2>Changes to the Privacy Policy</h2>
          <p>
            We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date at the top of this privacy policy.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> info@impulsoco.nl<br />
            <strong>Address:</strong> Amsterdam, The Netherlands
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
