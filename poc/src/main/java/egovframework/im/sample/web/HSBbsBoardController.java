package egovframework.im.sample.web;

/*import com.ubstory.cmmn.Common;
import com.ubstory.cmmn.constant.PageMessage;
import com.ubstory.cmmn.page.request.PageRequest;
import com.ubstory.cmmn.page.session.PageSession;
import com.ubstory.cmmn.util.CollectionUtil;
import com.ubstory.cmmn.util.MapUtil;
import com.ubstory.cmmn.util.StringUtil;
import com.ubstory.cms.board.service.CmsBbsBoardDTO;
import com.ubstory.cms.board.service.CmsBbsBoardService;
import com.ubstory.cms.board.service.CmsBbsSettingService;
import com.ubstory.cms.board.service.CmsBbsSettingVO;
import com.ubstory.cms.board.web.CmsBbsBoardController;
import com.ubstory.hs.board.service.HSBbsBoardService;*/
import egovframework.rte.fdl.cmmn.exception.BaseException;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller("bbsBoardController")
public class HSBbsBoardController extends CmsBbsBoardController<CmsBbsBoardDTO, CmsBbsBoardDTO> {

	static Logger log = Logger.getLogger(CmsBbsBoardController.class);
	
	@Autowired
    private CmsBbsSettingService bbsSettingService;
    
	@ResponseBody
	@RequestMapping(value={"/bbs/ajax/boardView.do", "/{loginStr}/bbs/ajax/boardView.do"}, method=RequestMethod.POST)
    public void getViewWithAjax(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws BaseException {
		setNewMessage(model);
		setNewJsonResponse();
		CmsBbsSettingVO bbsSettingVO = getBbsSetting(request);
		checkViewAuth(request, bbsSettingVO);
		int bsIdx = bbsSettingVO.getBsIdx();
		int bIdx = bbsSettingVO.getbIdx();
		int memIdx = PageSession.getLoginMemIdx();
		

		Map<String, Object> result = super.getViewResult(request, response, model);
		log.info("==================== result ==========================");
		log.info(result);
		if (result != null) {

			((CmsBbsBoardService)getCmsBaseService()).updateClickCnt(bsIdx, bIdx, PageMessage.VIEW_CNT, memIdx, Common.getRemoteAddr(request));
		
			//result = ((CmsBbsBoardService)getCmsBaseService()).setBoardWriterName(bbsSettingVO, result);
			((CmsBbsBoardService)getCmsBaseService()).setBoardWriterName(bbsSettingVO, result);

			putJsonObjectValue("result", result);
		}

		Common.outWrite(getJsonResponse(), response);
    }
	
    @Override
    @ResponseBody
    @RequestMapping(value={"/bbs/ajax/boardWriteProc.do", "/{loginStr}/bbs/ajax/boardWriteProc.do"})
    public void ajaxWriteProc(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws BaseException {

        super.ajaxWriteProc(request, response, model);

        Common.outWrite(getJsonResponse(), response);
    }
/*	
	@RequestMapping(value={"/bbs/ajax/boardWriteProc.do", "/{loginStr}/bbs/ajax/boardWriteProc.do"})
	public void ajaxWriteProc(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws BaseException{
		Map<String, Object> paramMap = PageRequest.getParameterMap(request);
		setNewMessage(model);
		setNewJsonResponse();
		boolean isProc = true;
		
		// 게시판 설정 가져오기
		CmsBbsSettingVO bbsSetting = getBbsSetting(request);
		
		if (isProc) {
			setNewMessage(model);

			model.addAttribute("bbsSetting", bbsSetting);

			if (bbsSettingService.isContainProhibitedWord(bbsSetting, MapUtil.getString(paramMap, "SUBJECT"), MapUtil.getString(paramMap, "REMARK"))) {
				setFailedMessage(bbsSetting.getReturnMessage());
			} else {
				
				this.setBbsSettingVO(bbsSetting);
				
				//model.addAttribute("MEM_IDX", PageSession.getLoginMemIdx());
				model.addAttribute("IP_ADDR", Common.getRemoteAddr(request));

				//setFileUploadOption(bbsSetting.getFileMax() * 1024 * 1024, false);
				
				super.writeProc(request, response, model);
				setJsonSuccessMessage("완료되었습니다.");
			}
			
		} else {
			setJsonFailedMessage("잘못된 접근입니다.");
		}
		
		Common.outWrite(getJsonResponse(), response);
	}*/

}
