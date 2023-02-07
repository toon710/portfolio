var cnt = 1;
$(document).ready(function(){
	
	/* 아이디 체크 */
	$('#ck').click(function(){
		var sid = $('#id').val();
		if(!sid){
			$('#id').focus();
			return;
		}
		
		var idexp = /^[a-z][a-z0-9]{4,9}$/;
		var testid = idexp.test(sid);
		if(!testid){
			$('#idmsg').css('color', 'red').html('아이디 입력형식이 맞지 않습니다');
			$('#id').focus();
			return;
		}
		
		$.ajax({
			url : '/chopa/member/idCheck.chp',
			type : 'post',
			dataType : 'json',
			data: {
				id: sid
			},
			success: function(data){
				if(data.result == 'OK'){
					$('#idmsg').css('color', 'green').css('text-align', 'center').html('사용가능한 아이디입니다.');					
				} else {
					$('#idmsg').css('color', 'red').css('text-align', 'center').html('사용할 수 없는 아이디입니다!');
					
				}
				//$('#idMsg').css('display', 'block');
			},
			error: function(){
				alert('### 통신 오류 ###')
			}
		})
	});
	
	/* 비밀번호 확인 */	
	$('#repw').keyup(function(){
			var tkey = $('#pw').val();			
	
			var skey = $(this).val();
			
			$('#repwmsg').stop().fadeOut(300, function(){ 
				if(skey == tkey){
					// $(this) 이 함수내에서 this는 #pwmsg를 가리킨다.
					$('#pw').blur();
					$('#repwmsg').html('비밀번호 확인이 끝났습니다.');
					$('#repwmsg').removeClass('w3-text-red').addClass('w3-text-blue');
				} else {
					$('#repwmsg').html('비밀번호가 다릅니다.');
					$('#repwmsg').removeClass('w3-text-blue').addClass('w3-text-red');
					
				}
				$('#repwmsg').fadeToggle(300);
			});
		});
		
	});
	
	/* 이미지 선택 */
	$('#filefr').on('change', '.file', function(evt){
			var sfile = $(this).val();
			if(!sfile){
				// 선택 취소 태그 삭제
				var sid = $(this).attr('id');				
				sid = sid.substring(4);
				//alert(sid);
				$('#file' + sid).remove();
				$('#image' + sid).parent().parent().remove();
				// 미리보기 없을때 프리뷰창 없애기
				var z = $('#imgfr img').length;
				//alert(z);
				if(z==0){
					$('#preView').slideUp(500);
				}
				return;
			}
			var no = cnt;
			var path = URL.createObjectURL(evt.target.files[0]);
			$('#preView').stop().slideUp(500, function(){
				addTag(path, no);
				$('#preView').slideDown(500);
			});
			$('#filefr').append('<input type="file" name="file" id="file' + ++cnt + 
									'" class="w3-col w3-input w3-border w3-round-medium file" placeholder="이미지 파일 선택!">');
		});
		
		function addTag(path, no){
			var tag =	'<div class="inblock box100 w3-border mgl10 mgb10 w3-card-4">' +
							'<div class="w3-col w3-border imgbox mgl10 mgb10 mgt10">' +
								'<img class="img1" id="image' + no + '" src="' + path + '">' +
							'</div>' +
						'</div>';
			$('#imgfr').append(tag);
		}
	
	/* 아바타 선택 */
	
	$('input[name="gen"]').change(function(){
            
            var sgen = $('.gen:checked').val();
            
            
            var htag = '';
            var stag = '';
            if(sgen == 'M'){
               stag = '#man';
               htag = '#woman';
            } else {
               htag = '#man';
               stag = '#woman';
               
            }
            
            $(htag).slideUp(600, function(){            
               $(stag).slideDown(600);
               $('#avaLa').css('display', 'block');
     		});
	});
	
	
	
	/* JOIN 클릭이벤트 */
	$('#jbtn').click(function(){
		var sname = $('#name').val();
		var sid = $('#id').val();
		var spw = $('#pw').val();
		var smail = $('#mail').val();
		var spn = $('#pn').val();
		
		var namePtt = /^[가-힣]{2,10}$/;
		var idPtt = /^[a-z][a-z0-9]{4,9}$/;
		var pwPtt = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#%*_!?])([a-zA-Z0-9#%*_!?]{5,8})$/;
		var mailPtt = /^[a-z0-9]{4,10}@[a-z]{2,10}[.][a-z]{2,3}(\.[a-z]{0,2})?$/;
		var pnPtt = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;
		
		var tname = namePtt.test(sname);
		var tid = idPtt.test(sid);
		var tpw = pwPtt.test(spw);
		var tmail = mailPtt.test(smail);
		var tpn = pnPtt.test(spn);
		
		if(!tname){		
			$('#namemsg').html('이름 입력형식이 맞지 않습니다');
			$('#name').focus();
			return;
		}
		if(!tid){		
			$('#idmsg').html('아이디 입력형식이 맞지 않습니다');
			$('#id').focus();
			return;
		}

		if(!tpw){		
			$('#pwmsg').html('비밀번호 입력형식이 맞지 않습니다');			
			$('#pw').focus();
			return;
		}
		if(!tmail){		
			$('#mailmsg').html('메일 입력형식이 맞지 않습니다');
			$('#mail').focus();
			return;
		}
		if(!tpn){		
			$('#pnmsg').html('전화번호 입력형식이 맞지 않습니다');
			$('#pn').focus();
			return;
		}
		
		$('#filefr input').last().attr("disabled", true);
		
		if(confirm('전송할까요???')){
			alert('전송이 진행됩니다.');
			$('#frm').submit();
		} else {
			alert('전송이 취소되었습니다.');
		}		
	});
