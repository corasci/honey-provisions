import Link from "next/link";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>

      <p>
        If you’re interested in submitting a new formulation request, please{" "}
        <Link href="/builder" className="text-blue-600 underline hover:text-blue-800">
          use our product profile builder
        </Link>
        . It’s the fastest way to initiate a new project.
      </p>

      <p>
        For all other inquiries, email us at{" "}
        <a href="mailto:info@honeyprovisions.com" className="text-blue-600 underline hover:text-blue-800">
          info@honeyprovisions.com
        </a>.
      </p>

      <div className="flex flex-col items-center border-t pt-6">
        <Image
          src="/texas-austin.png"
          alt="Map of Texas with Austin marked"
          width={160}
          height={160}
          className="mb-4"
        />
        <div className="text-sm text-center text-gray-700">
          <p>Honey Provisions</p>
          <p>2900 W. Anderson Lane</p>
          <p>Suite C-200, #270</p>
          <p>Austin, TX 78757</p>
          <p>Phone: Coming soon</p>
        </div>
      </div>
    </div>
  );
}
