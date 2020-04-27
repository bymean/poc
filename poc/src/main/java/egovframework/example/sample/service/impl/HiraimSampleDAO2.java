package egovframework.example.sample.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Repository("hiraimSampleDAO2")
public class HiraimSampleDAO2 extends EgovAbstractDAO {

	public List<?> singoList(EgovMap map) {		
		return list("sampleDAO.singoList", map);
	}
	
	public int singoInsert(EgovMap map) {		
		return update("sampleDAO.singoInsert", map);
	}
	
	public int singoUpdate(EgovMap map) {		
		return update("sampleDAO.singoUpdate", map);
	}
}
