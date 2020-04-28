/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package egovframework.example.sample.web;




import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.support.SessionStatus;
import org.springmodules.validation.commons.DefaultBeanValidator;

import egovframework.example.sample.service.HiraimSampleService;
import egovframework.example.sample.service.SampleDefaultVO;
import egovframework.example.sample.service.SampleVO;
import egovframework.example.sample.service.Tbbjf118VO;

import egovframework.rte.fdl.cmmn.exception.BaseException;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.psl.dataaccess.util.EgovMap;



/**
 * @Class Name : EgovSampleController.java
 * @Description : EgovSample Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Controller
public class HiraimSampleController {

	/** HiraimSampleService */
	@Resource(name = "hiraimSampleService")
	private HiraimSampleService hiraimSampleService;

	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	/** Validator */
	@Resource(name = "beanValidator")
	protected DefaultBeanValidator beanValidator;

	private static final Logger LOGGER = LoggerFactory.getLogger(HiraimSampleService.class);

	private static final ArrayList map = null;
	
	@RequestMapping("/wookTest.do")
	public java.util.List<?> wookTest(SampleVO sampleVO, @ModelAttribute("searchVO") SampleDefaultVO searchVO, SessionStatus status) throws Exception {
		//System.out.println(hiraimSampleService.wookTest(sampleVO).get(0).toString());
		return hiraimSampleService.wookTest(null);
	//	status.setComplete();
	//	return "forward:/egovSampleList.do";
	}
	
	
	@RequestMapping(value="/sampleGridList.do", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	@CrossOrigin
	public ResponseEntity sampleGridList(@RequestParam Map<String,Object> map) throws Exception {
		EgovMap tMap = new EgovMap();
		LOGGER.debug(map.toString());
		
		tMap.put("searchEno", map.get("searchEno"));
		tMap.put("gubun", map.get("gubun"));	
		tMap.put("prsStatCd", map.get("prsStatCd"));
		List<Map> list = (List<Map>) hiraimSampleService.wookTest(tMap);		
		JSONObject obj = new JSONObject();
		obj.put("resultList",list);
		return new ResponseEntity(obj.toJSONString(),HttpStatus.OK);		

	}
	
	@RequestMapping(value="/sampleGridDtl.do", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	@CrossOrigin
	public ResponseEntity sampleGridDtl(@RequestParam Map<String,Object> map) throws Exception {		
		LOGGER.debug(map.toString());
		LOGGER.debug("eno:"+map.get("eno"));
		LOGGER.debug("regSno:"+map.get("regSno"));
		EgovMap tMap = new EgovMap();
		tMap.put("eno", map.get("eno"));
		tMap.put("regSno", map.get("regSno"));		

		List<Map> list = (List<Map>) hiraimSampleService.sampleGridDtl(tMap);		
		JSONObject obj = new JSONObject();
		obj.put("resultList",list.get(0));
		return new ResponseEntity(obj.toJSONString(),HttpStatus.OK);		

	}
	
	@RequestMapping(value="/insertTbbjf118Dtl.do", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	@CrossOrigin
	public ResponseEntity insertTbbjf118Dtl(@RequestParam Map<String,Object> map,HttpServletRequest request) throws Exception {		
		
		EgovMap tMap = new EgovMap();
		
		LOGGER.debug(map.toString());		
		tMap.put("eno", map.get("eno"));
		tMap.put("regSno", map.get("regSno"));
		tMap.put("ftusTpCd", map.get("ftusTpCd"));
		tMap.put("cncrDd", map.get("cncrDd"));
		tMap.put("aplDd", map.get("aplDd"));
		tMap.put("admtDd", map.get("admtDd"));
		tMap.put("wlfrAplPrgStatCd", map.get("wlfrAplPrgStatCd"));
		tMap.put("txtReqWork", map.get("txtReqWork"));
		tMap.put("chbirSpplPaymYn", map.get("chbirSpplPaymYn"));
		tMap.put("chbirEptDd", map.get("chbirEptDd"));
		tMap.put("chgChcrRsRsTxt", map.get("chgChcrRsRsTxt"));
		tMap.put("rnRsTxt", map.get("rnRsTxt"));
		
		LOGGER.debug(tMap.toString());
		int resultStat = hiraimSampleService.insertTbbjf118Dtl(tMap);		
		JSONObject obj = new JSONObject();
		obj.put("resultStat",resultStat);
		return new ResponseEntity(obj.toJSONString(),HttpStatus.OK);		

	}
	
	/*
	@RequestMapping(value="/wookTest44.do", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	@CrossOrigin
	public ResponseEntity wookTest44(@RequestParam Map map) throws Exception {
		List<Map> list = (List<Map>) hiraimSampleService.wookTest(map);
		
		
		HashMap<String,Object> retrurnMap = new HashMap<String,Object>();
		list.add(map);
		retrurnMap.put("resultList",list);
		
		JSONObject obj = new JSONObject();
		obj.put("resultList",retrurnMap);
		return new ResponseEntity(obj.toJSONString(),HttpStatus.OK);		

	}
	

	
	@RequestMapping(value="/wookTest88.do", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	public String wookTest88(@RequestParam Map map,HttpServletRequest request, HttpServletResponse response) throws Exception {		
		String callBack = request.getParameter("params");
		List<Map> list = new ArrayList<Map>();
		HashMap<String,Object> retrurnMap = new HashMap<String,Object>();
		list.add(map);
		retrurnMap.put("resultList",list);
		//System.out.println("재욱천재"+map.toString());
		JSONObject obj = new JSONObject();
		obj.put("resultList",retrurnMap);
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
		response.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		return obj.toJSONString();
		

	}
	
*/


	private Object aa(int i) {
		// TODO Auto-generated method stub
		return null;
	}
	


	
	
}
