// react-icons 라이브러리
import React from 'react';
import { AiOutlineLink, AiOutlineFile, AiFillFile } from 'react-icons/ai';
import { BiSearch, BiCheckbox } from 'react-icons/bi';
import {
  BsFillExclamationCircleFill,
  BsPlusCircle,
  BsPlusCircleFill,
  BsBarChart,
  BsBarChartFill,
} from 'react-icons/bs';
import { FaStar, FaGoogle } from 'react-icons/fa';
import { FaCheck, FaExclamation, FaFilter } from 'react-icons/fa6';
import { FiSun, FiMoon } from 'react-icons/fi';
import { GoHome, GoHomeFill, GoTrash } from 'react-icons/go';
import { GrDrag } from 'react-icons/gr';
import { HiMiniCheckCircle, HiExclamationTriangle } from 'react-icons/hi2';
import { IoMdDownload } from 'react-icons/io';
import { IoClose, IoMail, IoCheckmarkCircle } from 'react-icons/io5';
import { MdKeyboardArrowLeft, MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { PiCopy, PiFolderSimpleLight } from 'react-icons/pi';
import { RiInformationLine } from 'react-icons/ri';
import { RiUserFill, RiUserLine } from 'react-icons/ri';
import { TbReload } from 'react-icons/tb';
import { VscEdit } from 'react-icons/vsc';

// css
import {
  LoadingSpinnerStyled,
  RemoveBadgeStyled,
} from '@/public/svgs/Icons.styles';

// ts
import { SvgProps, SpanProps } from '@/types/types';

// components
export function CloseIcon(props: SvgProps) {
  return <IoClose {...props} />;
}

export function LightModeIcon(props: SvgProps) {
  return <FiSun size="19" {...props} />;
}

export function DarkModeIcon(props: SvgProps) {
  return <FiMoon size="20" {...props} />;
}

// 메뉴 아이콘
export function HomeIcon(props: SvgProps) {
  return <GoHome {...props} />;
}

export function FilledHomeIcon(props: SvgProps) {
  return <GoHomeFill {...props} />;
}

export function CreateIcon(props: SvgProps) {
  return <BsPlusCircle {...props} />;
}

export function FilledCreateIcon(props: SvgProps) {
  return <BsPlusCircleFill {...props} />;
}

export function FormIcon(props: SvgProps) {
  return <AiOutlineFile {...props} />;
}

export function FilledFormIcon(props: SvgProps) {
  return <AiFillFile {...props} />;
}

export function ChartIcon(props: SvgProps) {
  return <BsBarChart {...props} />;
}

export function FilledChartIcon(props: SvgProps) {
  return <BsBarChartFill {...props} />;
}

export function UserIcon(props: SvgProps) {
  return <RiUserLine {...props} />;
}

export function FilledUserIcon(props: SvgProps) {
  return <RiUserFill {...props} />;
}
// 메뉴 아이콘 끝

export function TrashIcon(props: SvgProps) {
  return <GoTrash {...props} />;
}

export function DragIcon(props: SvgProps) {
  return <GrDrag size="20" {...props} />;
}

export function LinkIcon(props: SvgProps) {
  return <AiOutlineLink size="21" {...props} />;
}

export function EditIcon(props: SvgProps) {
  return <VscEdit size="18" {...props} />;
}

export function CopyIcon(props: SvgProps) {
  return <PiCopy size="20" {...props} />;
}

export function SearchIcon(props: SvgProps) {
  return <BiSearch size="20" {...props} />;
}

export function RemoveBadge(props: SvgProps) {
  return (
    <RemoveBadgeStyled {...props}>
      <IoClose />
    </RemoveBadgeStyled>
  );
}

export function ReloadIcon(props: SvgProps) {
  return <TbReload {...props} />;
}

export function SuccessBadge(props: SvgProps) {
  return <HiMiniCheckCircle size="20" {...props} />;
}

export function ErrorBadge(props: SvgProps) {
  return <HiExclamationTriangle size="20" {...props} />;
}

export function EmptyCheckboxIcon(props: SvgProps) {
  return <BiCheckbox size="27" {...props} />;
}

export function StarIcon(props: SvgProps) {
  return <FaStar size="25" {...props} />;
}

export function LoadingSpinner(props: SpanProps) {
  return (
    <LoadingSpinnerStyled>
      <span {...props} className="loading-spinner"></span>
    </LoadingSpinnerStyled>
  );
}

export function InfoIcon(props: SvgProps) {
  return <RiInformationLine {...props} />;
}

export function CorrectIcon(props: SvgProps) {
  return <IoCheckmarkCircle {...props} />;
}

export function CorrectMark(props: SvgProps) {
  return <FaCheck {...props} />;
}

export function WrongMark(props: SvgProps) {
  return <FaExclamation {...props} />;
}

export function CautionIcon(props: SvgProps) {
  return <BsFillExclamationCircleFill {...props} />;
}

export function GoogleLogo(props: SvgProps) {
  return <FaGoogle {...props} />;
}

export function ArrowIcon(props: SvgProps) {
  return <MdKeyboardArrowLeft size="25" {...props} />;
}

export function DoubleArrowIcon(props: SvgProps) {
  return <MdKeyboardDoubleArrowLeft size="25" {...props} />;
}

export function MailIcon(props: SvgProps) {
  return <IoMail {...props} />;
}

export function EmptyIcon(props: SvgProps) {
  return <PiFolderSimpleLight {...props} />;
}

export function DownloadIcon(props: SvgProps) {
  return <IoMdDownload {...props} />;
}

export function FilterIcon(props: SvgProps) {
  return <FaFilter {...props} />;
}

// export function Icon(props:Props) {
//   return < {...props} />;
// }
