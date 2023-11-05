import Layout from '../../common/layout/Layout';
import './Members.scss';

export default function Members() {
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
											<input type='text' name='userid' placeholder='userId' />
										</td>
										<td>
											<input type='text' name='email' placeholder='email' />
										</td>
									</tr>
									<tr>
										<td>
											<input type='password' name='pwd1' placeholder='password' />
										</td>
										<td>
											<input type='password' name='pwd2' placeholder='re-password' />
										</td>
									</tr>

									<tr>
										<td colSpan='2'>
											<select name='edu'>
												<option value=''>Education</option>
												<option value='elementary-school'>초등학교 졸업</option>
												<option value='middle-school'>중학교 졸업</option>
												<option value='high-school'>고등학교 졸업</option>
												<option value='college'>대학교 졸업</option>
											</select>
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<input type='radio' value='female' id='female' name='gender' />
											<label htmlFor='female'>Female</label>

											<input type='radio' value='male' id='male' name='gender' />
											<label htmlFor='male'>Male</label>
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<input type='checkbox' name='interest' id='sports' />
											<label htmlFor='sports'>Sports</label>

											<input type='checkbox' name='interest' id='reading' />
											<label htmlFor='reading'>Reading</label>

											<input type='checkbox' name='interest' id='music' />
											<label htmlFor='music'>Music</label>

											<input type='checkbox' name='interest' id='game' />
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
