'use client';

import { useLayoutEffect, useRef, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import gsap, { Circ } from 'gsap';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import Button from '../ui/Button';
import Input from '../ui/form/Input';
import Label from '../ui/form/Label';
import Textarea from '../ui/form/Textarea';
import Error from '../ui/form/Error';
import { Contact } from '@/lib/sanity/requests';
import useScrollShow from '@/hooks/useScrollShow';
import objectToFormData from '@/utils/objectToFormData';
import { Language } from '@/utils/langPageProps';
import { getTranslatedText } from '@/utils/getTranslatedText';
import {
  sendMessageSchema,
  SendMessageValues,
} from '@/schemas/sendMessageSchema';
import { sendMessage } from '@/actions/sendMessage';

const ContactForm = ({ form, lang }: CommissionsFormProps) => {
  const { executeAsync } = useAction(sendMessage);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendMessageValues>({
    resolver: zodResolver(sendMessageSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);
  const showed = useScrollShow(formRef);

  useLayoutEffect(() => {
    if (!showed || !formRef.current || window.innerWidth < 1024) return;

    const [inputs, button] = formRef.current.children;

    const tl = gsap.timeline({ delay: 0.5 });

    tl.set([inputs, button], { visibility: 'visible' })
      .from(inputs.children, {
        opacity: 0,
        y: -40,
        stagger: 0.2,
        ease: Circ.easeOut,
      })
      .from(button, { opacity: 0, y: -40, ease: Circ.easeOut });
  }, [showed]);

  const { name, email, description, send } = form;

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const result = await executeAsync(objectToFormData(data));

      result?.data?.error &&
        toast.error(getTranslatedText(result.data.error, lang));

      if (result?.data?.success) {
        reset();
        toast.success(getTranslatedText(result.data.success, lang));
      }
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

          <Input
            className="absolute opacity-0 top-0 left-0 z-[-5] h-0 w-0"
            autoComplete="off"
            type="text"
            {...register('bkuXk05')}
          />
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
  form: Contact['form'];
  lang?: Language;
};

export default ContactForm;
