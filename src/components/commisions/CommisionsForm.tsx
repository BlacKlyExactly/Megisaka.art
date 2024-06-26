'use client';

import { lazy, useLayoutEffect, useRef } from 'react';
import gsap, { Circ } from 'gsap';

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
import Textarea from '../ui/form/Textarea';
import useScrollShow from '@/hooks/useScrollShow';
import { CommisionsSection } from '@/sanity/requests';
import { Language } from '@/utils/langPageProps';
import { getTranslatedText } from '@/utils/getTranslatedText';

const CommisionsForm = ({ form, lang }: CommissionsFormProps) => {
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

  const { name, email, artType, attachments, description, send } = form;

  return (
    <form className="w-full mt-5 flex flex-col gap-6 lg:mt-16" ref={formRef}>
      <div className="flex flex-col gap-8 lg:flex-row lg:invisible">
        <div className="flex gap-8 flex-col w-full">
          <div className="flex flex-col gap-2 lg:gap-3">
            <Label className="w-fit">
              {getTranslatedText(name.label, lang)}*
            </Label>
            <Input placeholder={getTranslatedText(name.placeholder, lang)} />
          </div>
          <div className="flex flex-col gap-2 lg:gap-3">
            <Label className="w-fit">
              {getTranslatedText(email.label, lang)}*
            </Label>
            <Input
              type="email"
              placeholder={getTranslatedText(email.placeholder, lang)}
            />
          </div>
          <div className="flex flex-col gap-2 lg:gap-3">
            <Label className="w-fit">
              {getTranslatedText(artType.label, lang)}*
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue
                  placeholder={getTranslatedText(artType.placeholder, lang)}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="live2d">
                    Live2d model (Basic or Advanced)
                  </SelectItem>
                  <SelectItem value="concept">Concept Art</SelectItem>
                  <SelectItem value="streaming">Streaming assets</SelectItem>
                  <SelectItem value="emotes">Emotes</SelectItem>
                  <SelectItem value="fanart">Fanart</SelectItem>
                  <SelectItem value="loadingScreen">Loading screen</SelectItem>
                  <SelectItem value="artLoadingScreen">
                    Animated loading screen of art
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 lg:gap-3">
            <Label className="w-fit">
              {getTranslatedText(attachments.label, lang)}
            </Label>
            <Input
              type="file"
              className="text-xs pt-3 file:text-light file:text-xs"
              placeholder="Select helpful files"
              multiple
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full lg:gap-3">
          <Label className="w-fit">
            {getTranslatedText(description.label, lang)}*
          </Label>
          <Textarea
            className="resize-none h-[300px] lg:h-full"
            placeholder={getTranslatedText(description.placeholder, lang)}
          />
        </div>
      </div>
      <Button className="w-fit lg:ml-auto lg:invisible">
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
