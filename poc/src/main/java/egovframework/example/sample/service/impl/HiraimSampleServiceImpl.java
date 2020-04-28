package egovframework.example.sample.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import antlr.collections.List;
import egovframework.example.sample.service.EgovSampleService;
import egovframework.example.sample.service.HiraimSampleService;
import egovframework.example.sample.service.SampleDefaultVO;
import egovframework.example.sample.service.SampleVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.psl.dataaccess.util.EgovMap;


@Service("hiraimSampleService")
public class HiraimSampleServiceImpl extends EgovAbstractServiceImpl implements HiraimSampleService {	

	private static final Logger LOGGER = LoggerFactory.getLogger(HiraimSampleService.class);

	/** SampleDAO */
	// TODO ibatis 사용
	@Resource(name = "hiraimSampleDAO")
	private HiraimSampleDAO hraimSampleDAO;




	@Override
	public java.util.List<?> wookTest(EgovMap map) throws Exception {
		LOGGER.debug("여기까지 호출한다");
		return hraimSampleDAO.wookTest(map);
	}
	
	
	@Override
	public java.util.List<?> sampleGridDtl(EgovMap map) throws Exception {
		LOGGER.debug("여기까지 호출한다"+map.toString());
		return hraimSampleDAO.sampleGridDtl(map);
	}
	
	@Override
	public int insertTbbjf118Dtl(EgovMap map) throws Exception {
		if(map.get("regSno") != null&&!("").equals(map.get("regSno"))) {
			return hraimSampleDAO.updateTbbjf118Dtl(map);
		}
		return hraimSampleDAO.insertTbbjf118Dtl(map);
	}
}
