import styled from '@emotion/styled';

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(161, 161, 161, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const SpinnerContainer = styled.div`
	width: 64px;
	height: 64px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Spin = styled.div`
	box-sizing: border-box;
	position: absolute;
	width: 100%;
	height: 100%;
	border: 4px solid #e2e8f0;
	border-top-color: #3b82f6;
	border-radius: 50%;
	animation: spinner 0.8s linear infinite;

	@keyframes spinner {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;

const LoaderText = styled.div`
	position: absolute;
	bottom: -30px;
	color: #3b82f6;
	font-size: 14px;
	font-weight: 500;
	animation: pulse 1.5s ease-in-out infinite;

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
	}
`;

const Loader = () => {
	return (
		<Overlay>
			<SpinnerContainer>
				<Spin />
				<LoaderText>Loading...</LoaderText>
			</SpinnerContainer>
		</Overlay>
	);
};

export default Loader;
