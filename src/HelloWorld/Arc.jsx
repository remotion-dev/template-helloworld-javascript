import {useState} from 'react';
import {random, useVideoConfig} from 'remotion';
import {COLOR_1, COLOR_2} from './constants';

const getCircumferenceOfArc = (rx, ry) => {
	return Math.PI * 2 * Math.sqrt((rx * rx + ry * ry) / 2);
};

const rxRatio = 135 / 1920; // Ratio of rx to width
const ryRatio = 300 / 1080; // Ratio of ry to height
const strokeWidthRatio = 30 / 1920; // Ratio of strokeWidth to width

export const Arc = ({progress, rotation, rotateProgress}) => {
	const {width, height} = useVideoConfig();


	const cx = width / 2; // Center X coordinate
	const cy = height / 2; // Center Y coordinate
	const rx = width * rxRatio;
	const ry = height * ryRatio;
	const strokeWidth = width * strokeWidthRatio;
	const arcLength = getCircumferenceOfArc(rx, ry);

	// Each svg Id must be unique to not conflict with each other
	const [gradientId] = useState(() => String(random(null)));

	return (
		<svg
			viewBox={`0 0 ${width} ${height}`}
			style={{
				position: 'absolute',
				transform: `rotate(${rotation * rotateProgress}deg)`,
			}}
		>
			<defs>
				<linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stopColor={COLOR_1} />
					<stop offset="100%" stopColor={COLOR_2} />
				</linearGradient>
			</defs>
			<ellipse
				cx={cx}
				cy={cy}
				rx={rx}
				ry={ry}
				fill="none"
				stroke={`url(#${gradientId})`}
				strokeDasharray={arcLength}
				strokeDashoffset={arcLength - arcLength * progress}
				strokeLinecap="round"
				strokeWidth={strokeWidth}
			/>
		</svg>
	);
};
