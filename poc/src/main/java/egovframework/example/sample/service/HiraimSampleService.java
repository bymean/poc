package egovframework.example.sample.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface HiraimSampleService {
	
	/**
	 * @param sampleVO
	 * @throws Exception
	 */
	List<?>  wookTest(EgovMap map) throws Exception;

	List<?> sampleGridDtl(EgovMap map) throws Exception;
	
	int insertTbbjf118Dtl(EgovMap map) throws Exception;

}
