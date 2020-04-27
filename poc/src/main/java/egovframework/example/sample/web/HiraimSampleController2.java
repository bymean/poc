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


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springmodules.validation.commons.DefaultBeanValidator;

import egovframework.example.sample.service.HiraimSampleService2;

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
public class HiraimSampleController2 {

	/** HiraimSampleService */
	@Resource(name = "hiraimSampleService2")
	private HiraimSampleService2 hiraimSampleService2;

	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	/** Validator */
	@Resource(name = "beanValidator")
	protected DefaultBeanValidator beanValidator;

	
	@RequestMapping(value="/singoList.do", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	@CrossOrigin
	public ResponseEntity singoList(@RequestParam Map<String, Object> map) throws Exception {
		EgovMap param = new  EgovMap();
		param.put("gubun", map.get("gubun"));
		param.put("status", map.get("status"));
		param.put("username", map.get("username"));
		
		List<Map> list =  (List<Map>) hiraimSampleService2.singoList(param);			
		JSONObject obj = new JSONObject();
		obj.put("resultList",list);
		return new ResponseEntity(obj.toJSONString(),HttpStatus.OK);		

	}
	
	@RequestMapping(value="/singoSave.do", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	@CrossOrigin
	public ResponseEntity singoSave(@RequestParam Map<String, Object> map) throws Exception {
		EgovMap param = new  EgovMap();

		param.put("no", map.get("no"));
		param.put("relNm", map.get("relNm"));
		param.put("famNm", map.get("famNm"));
		param.put("aplTpNm", map.get("aplTpNm"));
		param.put("delDd", map.get("delDd"));
		param.put("typeCode", map.get("typeCode"));
		param.put("grd", map.get("grd"));
		param.put("regDt", map.get("regDt"));
		param.put("natNm", map.get("natNm"));
		param.put("styAllowNm", map.get("styAllowNm"));
		param.put("styDt", map.get("styDt"));
		param.put("aplDt", map.get("aplDt"));
		param.put("prgStatNm", map.get("prgStatNm"));		
		param.put("eno", map.get("eno"));
		
		System.out.println(param);
		
		
		int list =  (int) hiraimSampleService2.singoSave(param);			
		JSONObject obj = new JSONObject();
		obj.put("resultList",list);
		return new ResponseEntity(obj.toJSONString(),HttpStatus.OK);		

	}



	
	
}
