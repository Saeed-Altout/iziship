"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { IconSend } from "@tabler/icons-react";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(7, { message: "Enter a valid phone number." }),
  email: z.string().email({ message: "Enter a valid email." }).or(z.literal("")),
  businessType: z.enum(["merchant", "carrier", "both"], {
    error: "Please select a business type.",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSuccess?: (values: ContactFormValues) => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const t = useTranslations("contact");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", email: "", businessType: undefined },
  });

  const businessType = watch("businessType");

  async function onSubmit(values: ContactFormValues) {
    await new Promise((r) => setTimeout(r, 600));
    onSuccess?.(values);
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} suppressHydrationWarning>
      <FieldGroup>
        {/* Name */}
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="contact-name">{t("fields.name")} *</FieldLabel>
          <Input
            id="contact-name"
            placeholder={t("placeholders.name")}
            aria-invalid={!!errors.name}
            suppressHydrationWarning
            {...register("name")}
          />
          <FieldError errors={[errors.name]} />
        </Field>

        {/* Phone + Email */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.phone}>
            <FieldLabel htmlFor="contact-phone">{t("fields.phone")} *</FieldLabel>
            <Input
              id="contact-phone"
              type="tel"
              placeholder={t("placeholders.phone")}
              aria-invalid={!!errors.phone}
              suppressHydrationWarning
              {...register("phone")}
            />
            <FieldError errors={[errors.phone]} />
          </Field>

          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="contact-email">{t("fields.email")}</FieldLabel>
            <Input
              id="contact-email"
              type="email"
              placeholder={t("placeholders.email")}
              aria-invalid={!!errors.email}
              suppressHydrationWarning
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>
        </div>

        {/* Business type */}
        <Field data-invalid={!!errors.businessType}>
          <FieldLabel htmlFor="contact-business-type">{t("fields.businessType")} *</FieldLabel>
          <Select
            value={businessType}
            onValueChange={(v) =>
              setValue("businessType", v as ContactFormValues["businessType"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger
              id="contact-business-type"
              className="w-full"
              aria-invalid={!!errors.businessType}
            >
              <SelectValue placeholder={t("placeholders.businessType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="merchant">{t("businessTypes.merchant")}</SelectItem>
                <SelectItem value="carrier">{t("businessTypes.carrier")}</SelectItem>
                <SelectItem value="both">{t("businessTypes.both")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldError errors={[errors.businessType]} />
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting || isSubmitSuccessful}
        className="mt-2 w-full rounded-xl font-extrabold shadow-[0_8px_24px_color-mix(in_oklch,var(--primary)_30%,transparent)]"
      >
        {isSubmitting ? (
          t("submit")
        ) : isSubmitSuccessful ? (
          t("submit")
        ) : (
          <>
            <IconSend data-icon="inline-start" />
            {t("submit")}
          </>
        )}
      </Button>

      <p className="text-center text-[12px] text-muted-foreground/60">{t("privacy")}</p>
    </form>
  );
}
