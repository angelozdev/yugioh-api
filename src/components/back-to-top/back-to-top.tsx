import { ArrowUp } from "components/icons";
import useBackToTop from "./use-back-to-top";

function BackToTopButton() {
  const { isVisible, backToTop } = useBackToTop({ threshold: 500 });

  return (
    <div
      className={`fixed bottom-3 transition-all duration-1000 bg-slate-50 border rounded-sm ${
        isVisible ? "right-3" : "-right-full"
      }`}
    >
      <button className="p-2" onClick={() => backToTop()}>
        <ArrowUp />
      </button>
    </div>
  );
}

export default BackToTopButton;
