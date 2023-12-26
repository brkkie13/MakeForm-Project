// react-icons 라이브러리
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
import { FaCheck, FaExclamation } from 'react-icons/fa6';
import { FiSun, FiMoon } from 'react-icons/fi';
import { GoHome, GoHomeFill, GoTrash } from 'react-icons/go';
import { GrDrag } from 'react-icons/gr';
import { HiMiniCheckCircle, HiExclamationTriangle } from 'react-icons/hi2';
import { IoClose, IoMail } from 'react-icons/io5';
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
} from '@components/assets/Icons.styles';

// components
export function CloseIcon(props) {
  return <IoClose {...props} />;
}

export function LightModeIcon(props) {
  return <FiSun size="19" {...props} />;
}

export function DarkModeIcon(props) {
  return <FiMoon size="20" {...props} />;
}

// 메뉴 아이콘
export function HomeIcon(props) {
  return <GoHome {...props} />;
}

export function FilledHomeIcon(props) {
  return <GoHomeFill {...props} />;
}

export function CreateIcon(props) {
  return <BsPlusCircle {...props} />;
}

export function FilledCreateIcon(props) {
  return <BsPlusCircleFill {...props} />;
}

export function FormIcon(props) {
  return <AiOutlineFile {...props} />;
}

export function FilledFormIcon(props) {
  return <AiFillFile {...props} />;
}

export function ChartIcon(props) {
  return <BsBarChart {...props} />;
}

export function FilledChartIcon(props) {
  return <BsBarChartFill {...props} />;
}

export function UserIcon(props) {
  return <RiUserLine {...props} />;
}

export function FilledUserIcon(props) {
  return <RiUserFill {...props} />;
}
// 메뉴 아이콘 끝

export function TrashIcon(props) {
  return <GoTrash {...props} />;
}

export function DragIcon(props) {
  return <GrDrag size="20" {...props} />;
}

export function LinkIcon(props) {
  return <AiOutlineLink size="21" {...props} />;
}

export function EditIcon(props) {
  return <VscEdit size="18" {...props} />;
}

export function CopyIcon(props) {
  return <PiCopy size="20" {...props} />;
}

export function SearchIcon(props) {
  return <BiSearch size="20" {...props} />;
}

export function RemoveBadge(props) {
  return (
    <RemoveBadgeStyled {...props}>
      <IoClose />
    </RemoveBadgeStyled>
  );
}

export function ReloadIcon(props) {
  return <TbReload {...props} />;
}

export function SuccessBadge(props) {
  return <HiMiniCheckCircle size="20" {...props} />;
}

export function ErrorBadge(props) {
  return <HiExclamationTriangle size="20" {...props} />;
}

export function EmptyCheckboxIcon(props) {
  return <BiCheckbox size="27" {...props} />;
}

export function StarIcon(props) {
  return <FaStar size="25" {...props} />;
}

export function LoadingSpinner(props) {
  return (
    <LoadingSpinnerStyled>
      <span {...props} className="loading-spinner"></span>
    </LoadingSpinnerStyled>
  );
}

export function InfoIcon(props) {
  return <RiInformationLine {...props} />;
}

export function CorrectMark(props) {
  return <FaCheck {...props} />;
}

export function WrongMark(props) {
  return <FaExclamation {...props} />;
}

export function CautionIcon(props) {
  return <BsFillExclamationCircleFill {...props} />;
}

export function GoogleLogo(props) {
  return <FaGoogle {...props} />;
}

export function ArrowIcon(props) {
  return <MdKeyboardArrowLeft size="25" {...props} />;
}

export function DoubleArrowIcon(props) {
  return <MdKeyboardDoubleArrowLeft size="25" {...props} />;
}

export function MailIcon(props) {
  return <IoMail {...props} />;
}

export function EmptyIcon(props) {
  return <PiFolderSimpleLight {...props} />;
}

// export function Icon(props) {
//   return < {...props} />;
// }
