import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import Image from "next/image";
import "react-phone-number-input/style.css";

import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectValue } from "./ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  NUMBER = "number",
}

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  required?: boolean;
}

const CustomSyriaFlag = () => (
  <img
    src="/information/syrian_flag.svg"
    alt="Syria"
    style={{ width: "28px", height: "18px" }}
  />
);

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
    required,
  } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div
          className="flex rounded-md border border-dark-500 bg-gray-200 focus-within:border focus-within:border-primary-color1"
          tabIndex={0}
        >
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className=" border-0 focus:ring-0 focus:outline-none text-gray-700"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.NUMBER: // Added NUMBER case
      return (
        <div
          className="flex rounded-md border border-dark-500 bg-gray-200 focus-within:border focus-within:border-primary-color1"
          tabIndex={0}
        >
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2 w-auto h-auto"
            />
          )}
          <FormControl>
            <Input
              {...field}
              type="number" // Set type to "number"
              placeholder={placeholder}
              className=" border-0 focus:ring-0 focus:outline-none text-gray-700"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl className="p-2 rounded-sm">
          <PhoneInput
            defaultCountry="SY"
            placeholder={placeholder}
            flags={{
              SY: CustomSyriaFlag,
            }}
            international
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
            className="input-phone  text-black focus:outline-none focus:border-2 focus:border-primary-color2 focus:ring-0 bg-gray-100"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            className="ml-2"
            alt="calendar"
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger border border-dark-500 pl-1 rounded-lg">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-textArea bg-gray-200 text-black"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </Label>
          </div>
        </FormControl>
      );
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label, required } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 flex flex-col">
          {fieldType !== FormFieldType.CHECKBOX &&
            label &&
            (required ? (
              <p className="flex items-center gap-1">
                <FormLabel className="mb-2">{label}</FormLabel>
                <span className="text-red-400 text-2xl -mt-1 ">*</span>
              </p>
            ) : (
              <FormLabel className="mb-2">{label}</FormLabel>
            ))}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
