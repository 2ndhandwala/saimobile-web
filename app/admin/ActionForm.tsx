"use client";
import { useActionState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import type { ActionState } from "./actions";

const initial: ActionState = {};

export function ActionForm({
  action,
  children,
  submitLabel,
  danger,
}: {
  action: (state: ActionState, fd: FormData) => Promise<ActionState>;
  children: ReactNode;
  submitLabel: string;
  danger?: boolean;
}) {
  const [state, formAction] = useActionState(action, initial);
  return (
    <form action={formAction} className="flex flex-col gap-4">
      {children}
      {state.error ? (
        <p className="text-sm text-red-700">{state.error}</p>
      ) : null}
      <SubmitButton label={submitLabel} danger={danger} />
    </form>
  );
}

function SubmitButton({ label, danger }: { label: string; danger?: boolean }) {
  const { pending } = useFormStatus();
  const base = danger
    ? "w-full border-2 border-ink rounded-md py-2 text-sm text-red-700"
    : "btn btn-yellow py-3 font-bold";
  return (
    <button type="submit" disabled={pending} className={base}>
      {pending ? "Saving…" : label}
    </button>
  );
}
