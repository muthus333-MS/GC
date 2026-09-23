import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2, Download } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const LabCertificatesModal: React.FC = () => {
  const { isCertificatesOpen, setIsCertificatesOpen } = useStore();

  if (!isCertificatesOpen) return null;

  const CERTIFICATES = [
    {
      title: 'FSSAI Central Manufacturing License',
      docNo: 'FSSAI Lic. No. 12421008000412',
      issuer: 'Food Safety and Standards Authority of India',
      validity: 'Valid through 2028',
      scope: 'Cold-pressed edible vegetable oils, ritual pooja oils, organic grain de-husking, and packaging.',
      status: 'Fully Compliant & Inspected'
    },
    {
      title: 'NABL Accredited Chemical & Fatty Acid Profile',
      docNo: 'Report REF: NABL-CHEM-2026-8841',
      issuer: 'Apex Food Testing Laboratories, Chennai',
      validity: 'Quarterly Batch Analysis',
      scope: 'Verified < 0.2% FFA (Free Fatty Acids), zero Argemone mexicana oil, zero mineral oils, zero residual hexane.',
      status: 'Grade 1 Pure & Unadulterated'
    },
    {
      title: 'AGMARK Grade Certification',
      docNo: 'AGMARK Certificate: TN-ED-0912',
      issuer: 'Directorate of Marketing & Inspection (Govt. of India)',
      validity: 'Active',
      scope: 'Special Grade Sesame (Gingelly) Oil and Cold Pressed Groundnut Oil.',
      status: 'Agmark Certified Special Grade'
    },
    {
      title: 'Non-Toxic Soot Analysis for Pooja Deepam Oils',
      docNo: 'Burn Analysis Report: POOJA-EMISS-771',
      issuer: 'Clean Air & Combustion Quality Council',
      validity: 'Certified 2026',
      scope: 'Zero heavy soot formation; non-toxic aromatic temple burn; steady flame life > 5 hours.',
      status: 'Soot-Free Certified'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF9F5] border border-stone-200 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                Purity Verifications & Lab Certificates
              </h2>
              <p className="text-xs text-stone-500">
                Sathyam Food Products · Manufacturer & Packager Compliance Record
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCertificatesOpen(false)}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Cards */}
        <div className="p-6 overflow-y-auto space-y-4">
          {CERTIFICATES.map((cert, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-2 hover:border-amber-700/40 transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif text-base font-bold text-stone-900">{cert.title}</h3>
                  <p className="font-mono text-xs text-amber-900 font-semibold">{cert.docNo}</p>
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  {cert.status}
                </span>
              </div>

              <div className="text-xs text-stone-600 space-y-1 pt-1 border-t border-stone-100">
                <p><strong className="text-stone-700">Issuing Body:</strong> {cert.issuer} ({cert.validity})</p>
                <p><strong className="text-stone-700">Scope of Test:</strong> {cert.scope}</p>
              </div>
            </div>
          ))}

          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-950 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Zero Adulteration Customer Guarantee</p>
              <p className="text-amber-900/90 mt-0.5 leading-relaxed">
                We stand 100% behind the chemical purity of our cold-pressed oils. If any independent NABL accredited lab detects argemone, paraffin, or mineral adulterants in any sealed Golden Crystal bottle, we offer an unconditional 10x refund guarantee.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-white flex justify-end shrink-0">
          <button
            onClick={() => setIsCertificatesOpen(false)}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-950 text-white text-xs font-semibold rounded-lg"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
