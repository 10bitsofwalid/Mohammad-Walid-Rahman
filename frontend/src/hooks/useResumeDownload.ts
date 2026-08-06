import { useState, useCallback, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../constants';

export function triggerResumeDownload() {
  const el = document.getElementById('resume');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
  window.dispatchEvent(new CustomEvent('trigger-resume-download'));
}

export function useResumeDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const startDownload = useCallback(() => {
    if (isDownloading) return;

    clearTimers();
    setIsDownloading(true);
    setProgress(null);
    setIsComplete(false);

    // Initial phase: null (indeterminate state showing pendingLabel "Sizing")
    const t0 = setTimeout(() => {
      setProgress(14);
    }, 1100);
    timersRef.current.push(t0);

    const steps = [
      { delay: 1500, val: 32 },
      { delay: 1900, val: 58 },
      { delay: 2300, val: 78 },
      { delay: 2700, val: 92 },
      { delay: 3000, val: 100 },
    ];

    steps.forEach(({ delay, val }) => {
      const tid = setTimeout(() => {
        setProgress(val);

        if (val === 100) {
          setIsComplete(true);

          // Trigger actual file download
          const link = document.createElement('a');
          link.href = PORTFOLIO_DATA.resume.fileUrl;
          link.download = PORTFOLIO_DATA.resume.fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Auto-reset state after completion display
          const resetId = setTimeout(() => {
            setIsDownloading(false);
            setProgress(null);
            setIsComplete(false);
          }, 3200);
          timersRef.current.push(resetId);
        }
      }, delay);

      timersRef.current.push(tid);
    });
  }, [isDownloading, clearTimers]);

  useEffect(() => {
    const handleEvent = () => {
      startDownload();
    };
    window.addEventListener('trigger-resume-download', handleEvent);
    return () => {
      window.removeEventListener('trigger-resume-download', handleEvent);
    };
  }, [startDownload]);

  return {
    isDownloading,
    progress,
    isComplete,
    startDownload,
  };
}
