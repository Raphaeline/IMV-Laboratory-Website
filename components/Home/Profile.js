import { RiInstagramFill, RiLineFill, RiYoutubeFill, RiLinkedinFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

export default function Profile() {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 md:gap-16 items-center p-4 md:p-8 md:h-96 text-center md:text-left">
      <div className="h-full w-full">
        <h1 className="mb-4 text-2xl font-bold tracking-wide">About Us</h1>
        <p className="">Image Processing & Vision Laboratory (IMV Lab) is a research laboratory under the umbrella of Information & Signal Processing expertise group in Telecommunication Engineering major at Telkom University.</p>
        <div className="flex justify-center md:justify-start gap-8 mt-8 mb-8 md:mb-0 text-gray-400">
          <a href="https://line.me/R/ti/p/@uyy9001n" target="_blank" rel="noopener noreferrer">
            <RiLineFill size={32} className="hover:text-green-500" />
          </a>
          <a href="https://www.instagram.com/imv.laboratory/" target="_blank" rel="noopener noreferrer">
            <RiInstagramFill size={32} className="hover:text-pink-500" />
          </a>
          <a href="https://www.linkedin.com/company/imv-laboratory/" target="_blank" rel="noopener noreferrer">
            <RiLinkedinFill size={32} className="hover:text-blue-700" />
          </a>
          <a href="mailto: imvlab@telkomuniversity.ac.id" target="_blank" rel="noopener noreferrer">
            <MdEmail size={32} className="hover:text-yellow-500" />
          </a>
        </div>
      </div>
      <div className="h-full w-full mb-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.3243079211456!2d107.62742009682003!3d-6.9710131158494875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9194df662b7%3A0x19c06868b3c34800!2sIMV%20LABORATORY!5e0!3m2!1sen!2sid!4v1681616066825!5m2!1sen!2sid"
          style={{ border: 0, width: "100%", height: "100%" }}
          className="rounded-xl shadow-2xl"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
