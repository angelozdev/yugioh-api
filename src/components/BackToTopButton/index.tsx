import { ArrowUp } from "components/icons";
import { useBackToTop } from "hooks";

function BackToTopButton() {
  const { isVisible, onBackToTop } = useBackToTop({ threshold: 500 });

  return (
    <div
      className={`fixed bottom-3 transition-all duration-1000 bg-slate-50 border rounded-sm ${
        isVisible ? "right-3" : "-right-full"
      }`}
    >
      <button className="p-2" onClick={() => onBackToTop()}>
        <ArrowUp />
      </button>
    </div>
  );
}

export default BackToTopButton;
