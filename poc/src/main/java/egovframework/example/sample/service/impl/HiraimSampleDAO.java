package egovframework.example.sample.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import egovframework.example.sample.service.HiraimSampleService;
import egovframework.example.sample.service.SampleVO;
import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Repository("hiraimSampleDAO")
public class HiraimSampleDAO extends EgovAbstractDAO {
	
	
	private static final Logger LOGGER = LoggerFactory.getLogger(HiraimSampleService.class);

	public List<?> wookTest(EgovMap map) {	
		return list("sampleDAO.wookTest", map);
	}

	public List<?> sampleGridDtl(EgovMap map) {
		LOGGER.debug(map.toString());
		return list("sampleDAO.sampleGridDtl", map);
	}
	
	public int insertTbbjf118Dtl(EgovMap map) {
		LOGGER.debug(map.toString());
		return  update("sampleDAO.insertTbbjf118Dtl", map);
	}
	
	public int updateTbbjf118Dtl(EgovMap map) {		
		return update("sampleDAO.updateTbbjf118Dtl", map);
	}
}
