'use client';

import { useLayoutEffect, useRef, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import gsap, { Circ } from 'gsap';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';

import Button from '../ui/Button';
import Input from '../ui/form/Input';
import Label from '../ui/form/Label';
import Select, {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/form/Select';
import { CommisionsSection } from '@/lib/sanity/requests';
import Textarea from '../ui/form/Textarea';
import Error from '../ui/form/Error';
import useScrollShow from '@/hooks/useScrollShow';
import objectToFormData from '@/utils/objectToFormData';
import { Language } from '@/utils/langPageProps';
import { getTranslatedText } from '@/utils/getTranslatedText';
import {
  sendCommissionSchema,
  SendCommissionValues,
} from '@/schemas/sendCommissionSchema';
import { sendCommission } from '@/actions/sendCommission';
import toast from 'react-hot-toast';

const ARTTYPE_CATEGORIES = [
  { display: 'Live2d model (Basic or Advanced)', value: 'live2d' },
  { display: 'Concept Art', value: 'concept' },
  { display: 'Streaming assets', value: 'streamingAssets' },
  { display: 'Emotes', value: 'emotes' },
  { display: 'Fanart', value: 'fanart' },
  { display: 'Loading screen', value: 'loadingScreen' },
  { display: 'Animated loading screen of art', value: 'artLoadingScreen' },
  { display: 'Other', value: 'other' },
];

const CommisionsForm = ({ form, lang }: CommissionsFormProps) => {
  const { executeAsync } = useAction(sendCommission);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SendCommissionValues>({
    resolver: zodResolver(sendCommissionSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);
  const showed = useScrollShow(formRef);

  useLayoutEffect(() => {
    if (!showed || !formRef.current || window.innerWidth < 1024) return;

    const [inputs, button] = formRef.current.children;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.set([inputs, button], { visibility: 'visible' })
      .from(inputs.children, {
        opacity: 0,
        y: -40,
        stagger: 0.2,
        ease: Circ.easeOut,
      })
      .from(button, { opacity: 0, y: -40, ease: Circ.easeOut });
  }, [showed]);

  const {
    name,
    email,
    artType,
    attachments,
    description,
    send,
    sendError,
    sendSuccess,
  } = form;

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const result = await executeAsync(objectToFormData(data));

      result?.data?.error && toast.error(getTranslatedText(sendError, lang));
      result?.data?.success &&
        toast.success(getTranslatedText(sendSuccess, lang));
    });
  });

  return (
    <form
      className="w-full mt-5 flex flex-col gap-6 lg:mt-16"
      ref={formRef}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:invisible">
        <div className="flex gap-8 flex-col w-full">
          <div className="flex flex-col gap-2 lg:gap-3">
            <Label
              className="w-fit text-left flex flex-col gap-2 lg:w-full lg:flex-row lg:justify-between"
              htmlFor="nameInput"
            >
              {getTranslatedText(name.label, lang)}*
              <Error>{errors.name?.message}</Error>
            </Label>
            <Input
              {...register('name')}
              id="nameInput"
              placeholder={getTranslatedText(name.placeholder, lang)}
            />
          </div>
          <div className="flex flex-col gap-2 lg:gap-3">
            <Label
              className="w-fit text-left flex flex-col gap-2 lg:w-full lg:flex-row lg:justify-between"
              htmlFor="emailInput"
            >
              {getTranslatedText(email.label, lang)}*
              <Error>{errors.email?.message}</Error>
            </Label>
            <Input
              {...register('email')}
              id="emailInput"
              type="email"
              placeholder={getTranslatedText(email.placeholder, lang)}
            />
          </div>
          <div className="flex flex-col gap-2 lg:gap-3">
            <Label className="w-fit text-left flex flex-col gap-2 lg:w-full lg:flex-row lg:justify-between">
              {getTranslatedText(artType.label, lang)}*
              <Error>{errors.artType?.message}</Error>
            </Label>
            <Controller
              control={control}
              name="artType"
              render={({ field }) => (
                <Select {...register('artType')} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={getTranslatedText(artType.placeholder, lang)}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {ARTTYPE_CATEGORIES.map(({ display, value }) => (
                        <SelectItem value={value} key={value}>
                          {display}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            ></Controller>
          </div>
          <div className="flex flex-col gap-2 lg:gap-3">
            <Label
              className="w-fit text-left flex flex-col gap-2 lg:w-full lg:flex-row lg:justify-between"
              htmlFor="filesInput"
            >
              {getTranslatedText(attachments.label, lang)}
            </Label>
            <Input
              {...register('files')}
              id="filesInput"
              type="file"
              className="text-xs pt-3 file:text-light file:text-xs"
              placeholder="Select helpful files"
              multiple
              accept="image/*"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full lg:gap-3">
          <Label
            className="w-fit text-left flex flex-col gap-2 lg:w-full lg:flex-row lg:justify-between"
            htmlFor="descriptionInput"
          >
            {getTranslatedText(description.label, lang)}*
            <Error>{errors.description?.message}</Error>
          </Label>
          <Textarea
            {...register('description')}
            id="descriptionInput"
            className="resize-none h-[300px] lg:h-full"
            placeholder={getTranslatedText(description.placeholder, lang)}
          />
        </div>
      </div>
      <Button className="w-fit lg:ml-auto lg:invisible" isPending={isPending}>
        {getTranslatedText(send, lang)}
      </Button>
    </form>
  );
};

type CommissionsFormProps = {
  form: CommisionsSection['form'];
  lang?: Language;
};

export default CommisionsForm;
