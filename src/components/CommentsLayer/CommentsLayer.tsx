import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useComments } from '../../contexts/CommentsContext';
import { commentData } from '../../comments/commentData';
import type { Comment } from '../../comments/types';
import './CommentsLayer.css';

interface PinPos { top: number; left: number; }

const NOTE_WIDTH = 256;
const NOTE_MARGIN = 10;
const NOTE_HEIGHT_APPROX = 150;
const PIN_INSET = 12; // keeps pin center inside the anchor element

function CommentPin({
  comment,
  index,
  pos,
  isOpen,
  onOpen,
  onClose,
}: {
  comment: Comment;
  index: number;
  pos: PinPos;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleMouseDown(e: MouseEvent) {
      if (pinRef.current && !pinRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen, onClose]);

  const openAbove = pos.top > NOTE_HEIGHT_APPROX + 40;
  const noteTop = openAbove
    ? pos.top - NOTE_HEIGHT_APPROX - 14
    : pos.top + 18;

  const rawLeft = pos.left - NOTE_WIDTH / 2;
  const noteLeft = Math.max(
    NOTE_MARGIN,
    Math.min(rawLeft, window.innerWidth - NOTE_WIDTH - NOTE_MARGIN)
  );

  return (
    <div ref={pinRef}>
      <div
        className={`comment-pin__badge${isOpen ? ' comment-pin__badge--open' : ''}`}
        style={{ position: 'fixed', top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
        onClick={() => isOpen ? onClose() : onOpen()}
        aria-label={`Comment ${index + 1}: ${comment.author}`}
        role="button"
      >
        {index + 1}
      </div>

      {isOpen && (
        <div
          className="comment-note"
          style={{ position: 'fixed', top: noteTop, left: noteLeft }}
        >
          <div className="comment-note__accent" />
          <div className="comment-note__body">
            <div className="comment-note__meta">
              <span className="comment-note__id">{comment.id}</span>
              <span className="comment-note__author">{comment.author}</span>
              <span className="comment-note__timestamp">{comment.timestamp}</span>
            </div>
            <p className="comment-note__text">{comment.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function computePositions(comments: Comment[]): Record<string, PinPos> {
  const next: Record<string, PinPos> = {};
  for (const comment of comments) {
    const el = document.querySelector(comment.selector);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    const edge = comment.anchorEdge ?? 'top-right';
    const ox = comment.offsetX ?? 0;
    const oy = comment.offsetY ?? 0;

    let top: number;
    let left: number;

    if (edge === 'top-right')         { top = rect.top    + PIN_INSET; left = rect.right  - PIN_INSET; }
    else if (edge === 'top-left')     { top = rect.top    + PIN_INSET; left = rect.left   + PIN_INSET; }
    else if (edge === 'bottom-right') { top = rect.bottom - PIN_INSET; left = rect.right  - PIN_INSET; }
    else                              { top = rect.bottom - PIN_INSET; left = rect.left   + PIN_INSET; }

    next[comment.id] = { top: top + oy, left: left + ox };
  }
  return next;
}

export function CommentsLayer() {
  const { commentsVisible, openPinId, setOpenPinId } = useComments();
  const { pathname } = useLocation();
  const [positions, setPositions] = useState<Record<string, PinPos>>({});

  const comments: Comment[] = commentData[pathname] ?? [];

  // Position pins synchronously after React commits the DOM
  useLayoutEffect(() => {
    if (!commentsVisible) {
      setPositions({});
      return;
    }
    setPositions(computePositions(comments));
  }, [commentsVisible, pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-position on scroll and resize
  useEffect(() => {
    if (!commentsVisible) return;
    const update = () => setPositions(computePositions(comments));
    const capsule = document.querySelector('[data-fabric-component="PageCapsule"]');
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    capsule?.addEventListener('scroll', update, { passive: true });
    return () => {
      ro.disconnect();
      capsule?.removeEventListener('scroll', update);
    };
  }, [commentsVisible, pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Clear open pin when comments hidden
  useEffect(() => {
    if (!commentsVisible) setOpenPinId(null);
  }, [commentsVisible, setOpenPinId]);

  if (!commentsVisible || comments.length === 0) return null;

  return (
    <div className="comments-layer" aria-hidden="true">
      {comments.map((comment, i) => {
        const pos = positions[comment.id];
        if (!pos) return null;
        return (
          <CommentPin
            key={comment.id}
            comment={comment}
            index={i}
            pos={pos}
            isOpen={openPinId === comment.id}
            onOpen={() => setOpenPinId(comment.id)}
            onClose={() => setOpenPinId(null)}
          />
        );
      })}
    </div>
  );
}
