import { forwardRef, PropsWithChildren } from "react";
import { BackToTopButton } from "components";

const Footer = forwardRef<HTMLDivElement, PropsWithChildren<{}>>(
  ({ children }, ref) => {
    return (
      <div>
        <div className="flex justify-center mt-4 mb-32">
          <div
            ref={ref}
            className="px-4 py-2 text-gray-400 rounded-sm inline-flex items-center shadow-sm"
          >
            {children}
          </div>
        </div>

        <BackToTopButton />
      </div>
    );
  }
);
Footer.displayName = "Footer";

export default Footer;
