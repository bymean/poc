package egovframework.example.sample.service;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface HiraimSampleService2 {
	
	/**
	 * @param sampleVO
	 * @throws Exception
	 */
	List<?>  singoList(EgovMap map) throws Exception;
	
	int singoSave(EgovMap map) throws Exception;

}
