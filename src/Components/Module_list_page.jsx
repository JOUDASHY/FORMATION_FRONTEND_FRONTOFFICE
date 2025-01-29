import React, { useEffect, useState } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Isotope from 'isotope-layout';
import Formation from './Formation';

const Module_list_page = () => {
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch modules from the API
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/modules`);
        setModules(response.data.results);
        setFilteredModules(response.data.results); // Initialiser les modules filtrés
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, []);

  // Filter modules based on the search term
  useEffect(() => {
    setFilteredModules(
      modules.filter(module =>
        module.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, modules]);

  // Initialize Isotope once modules are loaded
  useEffect(() => {
    if (filteredModules.length) {
      const isotope = new Isotope('.grid', {
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
      });
  
      // Gestion des clics pour les onglets de détails d'investissement
      $('.menu div').on('click', function () {
        const index = $(this).index();
  
        // Ajoute la classe active à l'onglet cliqué et la retire des autres
        $('.menu div').removeClass('active');
        $(this).addClass('active');
  
        // Affiche le contenu correspondant à l'onglet cliqué
        $('.nacc li').removeClass('active').eq(index).addClass('active');
      });
  
      return () => isotope.destroy(); // Nettoyage d'Isotope
    }
  }, [filteredModules]);

  return (
    <div className='mb-10'>
      {/* Page Heading */}
      <div className="page-heading">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header-text">
                <h2>Nos modules</h2>
                <div className="div-dec"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

     {/* Search Bar */}
     <div className="row mt-5">
    <div className="col-12 d-flex justify-content-center">
        <div className="input-group" style={{ maxWidth: '600px', width: '100%' }}>
            <span className="input-group-text bg-primary text-white" style={{ borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }}>
                <i className="fas fa-search" style={{ fontSize: '18px' }}></i>
            </span>
            <input
                type="text"
                className="form-control py-3 px-4"
                placeholder="Rechercher un module..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    borderTopLeftRadius: '0',  // Pas de border-radius à gauche
                    borderBottomLeftRadius: '0',  // Pas de border-radius à gauche
                    borderTopRightRadius: '50px',  // Radius sur le coin supérieur droit
                    borderBottomRightRadius: '50px',  // Radius sur le coin inférieur droit
                    borderLeft: 'none',  // Supprimer la bordure gauche
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                    fontSize: '16px',
                }}
                onFocus={(e) => e.target.style.boxShadow = '0px 6px 20px rgba(0, 0, 0, 0.15)'}
                onBlur={(e) => e.target.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.1)'}
            />
        </div>
    </div>
</div>



      {/* Main Services Section with Isotope grid */}
      <section className="main-services">
        <div className="container">
          <div className="row grid">
            {filteredModules.map((module) => (
              <div className="col-lg-12 grid-item" key={module.id}>
                <div className="service-item">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="left-image">
                        <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${module.image}`} alt={module.name} />
                      </div>
                    </div>
                    <div className="col-lg-6 align-self-center">
                      <div className="right-text-content">
                        <h4>{module.name}</h4>
                        <p>{module.description}</p>
                        <h5>Cours :</h5>
                        <ul>
                          {module.courses.map((course, index) => (
                            <li key={index}>{course.name}</li>
                          ))}
                        </ul>
                        <p>
                          Ce module vous permet de développer des compétences pratiques dans la fornation <strong> {module.formation.name}</strong>, avec un accent sur la préparation à la certification.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Module_list_page;
