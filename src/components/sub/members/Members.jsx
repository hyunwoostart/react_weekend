import { useSplitText } from '../../../hooks/useSplitText';
import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useState, useRef, useEffect } from 'react';

export default function Members() {
	const initVal = useRef({
		userid: '',
		email: '',
		pwd1: '',
		pwd2: '',
		edu: '',
		gender: '',
		interest: [],
		comments: '',
	});
	const [Val, setVal] = useState(initVal.current);

	// onChange 이벤트가 발생할때마다 해당 함수 호출
	const handleChange = (e) => {
		// 현재 입력하고 있는 가상돔요소의 name, value값을 비구조화할당으로 뽑아냄
		const { name, value } = e.target;
		// 객체안에서 property key값을 []로 감싸면 변수로 치환가능
		// name='userid'인 input요소의 onChange 이벤트가 발생하면
		// [name] --> 'userid', value: 내가 현재 입력하고 있는 값 등록
		// handleChange가 연결된 폼에 특정 값을 입력할때마다 실시간으로 해당 name값에 매칭되는 객체
		// property가 변경되고 변경된 값으로 State 수정
		// State가 변경될때마다 컴포넌트 재호출되면서 Input요소의 value속성으로 현재 State값이 실시간으로 출력됨

		setVal({ ...Val, [name]: value });
	};

	useEffect(() => {
		console.log(Val);
	}, [Val]);

	return (
		<Layout title={'Members'}>
			<div className='wrap'>
				<div className='infoBox'>
					<h2>Join Members</h2>
				</div>
				<div className='formBox'>
					<form>
						<fieldset>
							<legend className='h'>회원가입 폼</legend>
							<table>
								<tbody>
									<tr>
										<td>
											<input
												type='text'
												name='userid'
												placeholder='User ID'
												value={Val.userid}
												onChange={handleChange}
											/>
										</td>
										<td>
											<input
												type='text'
												name='email'
												placeholder='Email'
												value={Val.email}
												onChange={handleChange}
											/>
										</td>
									</tr>
									<tr>
										<td>
											<input
												type='password'
												name='pwd1'
												placeholder='Password'
												value={Val.pwd1}
												onChange={handleChange}
											/>
										</td>
										<td>
											<input
												type='password'
												name='pwd2'
												placeholder='Re-Password'
												value={Val.pwd2}
												onChange={handleChange}
											/>
										</td>
									</tr>

									<tr>
										<td colSpan='2'>
											<select name='edu'>
												<option defaultValue=''>Education</option>
												<option defaultValue='elementary-school'>초등학교 졸업</option>
												<option defaultValue='middle-school'>중학교 졸업</option>
												<option defaultValue='high-school'>고등학교 졸업</option>
												<option defaultValue='college'>대학교 졸업</option>
											</select>
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<input type='radio' defaultValue='female' id='female' name='gender' />
											<label htmlFor='female'>Female</label>

											<input type='radio' defaultValue='male' id='male' name='gender' />
											<label htmlFor='male'>Male</label>
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<input type='checkbox' name='interest' id='sports' defaultValue='sports' />
											<label htmlFor='sports'>Sports</label>

											<input type='checkbox' name='interest' id='reading' defaultValue='reading' />
											<label htmlFor='reading'>Reading</label>

											<input type='checkbox' name='interest' id='music' defaultValue='music' />
											<label htmlFor='music'>Music</label>

											<input type='checkbox' name='interest' id='game' defaultValue='game' />
											<label htmlFor='game'>Game</label>
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<textarea
												name='comments'
												cols='30'
												rows='5'
												placeholder='Leave a comment'
												value={Val.comments}
												onChange={handleChange}
											></textarea>
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<button>cancel</button>
											<button>submit</button>
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>
			</div>
		</Layout>
	);
}
