"use client";

import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

interface SubmitButtonFormProps {
  label: string;
  loading?: boolean;
}

export default function SubmitButtonForm({label, loading = false}: SubmitButtonFormProps) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className={`w-full mt-4 transition-all ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"}`}>
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Menyimpan...</span>
        </span>
      ) : (
        label
      )}
    </Button>
  );
}
