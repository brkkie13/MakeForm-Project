// react-icons library
import { IoClose } from 'react-icons/io5';
import { FiSun, FiMoon, FiEdit } from 'react-icons/fi';
import { HiOutlineChartBar } from 'react-icons/hi';
import {
  HiOutlineTrash,
  HiMiniCheckCircle,
  HiExclamationTriangle,
} from 'react-icons/hi2';
import { CgFileDocument } from 'react-icons/cg';
import { BiAddToQueue, BiSearch, BiCheckbox } from 'react-icons/bi';
import { GrDrag } from 'react-icons/gr';
import { AiOutlineLink } from 'react-icons/ai';
import { TbReload } from 'react-icons/tb';
import { FaStar } from 'react-icons/fa';
import { FaCheck, FaExclamation } from 'react-icons/fa6';
import { PiCopy } from 'react-icons/pi';
import { RiInformationLine } from 'react-icons/ri';
import { BsFillExclamationCircleFill } from 'react-icons/bs';

// css
import { LoadingSpinnerStyled, RemoveBadgeStyled } from './Icons.styles';

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

export function CreateIcon(props) {
  return <BiAddToQueue size="18" {...props} />;
}

export function FormIcon(props) {
  return <CgFileDocument size="18" {...props} />;
}

export function ChartIcon(props) {
  return <HiOutlineChartBar size="18" {...props} />;
}

export function TrashIcon(props) {
  return <HiOutlineTrash size="19" {...props} />;
}

export function DragIcon(props) {
  return <GrDrag size="20" {...props} />;
}

export function LinkIcon(props) {
  return <AiOutlineLink size="21" {...props} />;
}

export function EditIcon(props) {
  return <FiEdit size="18" {...props} />;
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

// export function Icon(props) {
//   return < {...props} />;
// }
