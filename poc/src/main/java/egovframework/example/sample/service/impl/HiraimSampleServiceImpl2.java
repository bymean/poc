package egovframework.example.sample.service.impl;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.example.sample.service.HiraimSampleService2;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;


@Service("hiraimSampleService2")
public class HiraimSampleServiceImpl2 extends EgovAbstractServiceImpl implements HiraimSampleService2 {	

	private static final Logger LOGGER = LoggerFactory.getLogger(HiraimSampleService2.class);

	/** SampleDAO */
	// TODO ibatis 사용
	@Resource(name = "hiraimSampleDAO2")
	private HiraimSampleDAO2 hraimSampleDAO2;
	// TODO mybatis 사용



	@Override
	public java.util.List<?> singoList(EgovMap map) throws Exception {		
		return hraimSampleDAO2.singoList(map);
	}
	
	
	@Override
	public int singoSave(EgovMap map) throws Exception {		
		
		if(map.get("no")!=null && !("").equals(map.get("no")))
		{
			return hraimSampleDAO2.singoUpdate(map);
		}
		else			
		{
			return hraimSampleDAO2.singoInsert(map);
			
		}
		
		
	}

}
