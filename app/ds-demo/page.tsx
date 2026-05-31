'use client';

/**
 * PILOTO design system (ADR-0034 Fase 3) — rota de validação.
 * Usa SÓ utilities semânticas (sem hex). action-primary deve renderizar o
 * vermelho ADNIPO (#DC2626 light / #F87171 dark) via o tema Nipo Wa.
 * Rota isolada: não altera nenhuma página existente do nipo_school.
 */
import { useState } from 'react';

export default function DsDemoPage() {
  const [dark, setDark] = useState(false);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  }

  return (
    <main data-theme={dark ? 'dark' : 'light'} className="min-h-dvh bg-surface-base text-text-primary">
      <div className="mx-auto max-w-container px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-heading-xl">Piloto — Nipo Wa via design system</h1>
            <p className="text-body-md text-text-secondary mt-1">
              Tudo abaixo usa tokens semânticos. action-primary = vermelho ADNIPO.
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="rounded-md border border-border-default bg-surface-raised px-4 py-2 text-body-sm font-semibold
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
          >
            {dark ? '☾ Dark' : '☀ Light'}
          </button>
        </div>

        <section className="mb-8">
          <h2 className="text-heading-sm mb-3">Ações</h2>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-md bg-action-primary px-4 py-2 text-body-sm font-semibold text-text-on-primary transition-colors duration-fast ease-out hover:bg-action-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2">
              Matricular aluno
            </button>
            <button className="rounded-md bg-action-secondary px-4 py-2 text-body-sm font-semibold text-text-primary hover:bg-action-secondary-hover">
              Cancelar
            </button>
            <button className="rounded-md bg-action-danger px-4 py-2 text-body-sm font-semibold text-text-on-danger hover:bg-action-danger-hover">
              Excluir
            </button>
            <button className="rounded-md bg-transparent px-4 py-2 text-body-sm font-semibold text-text-primary hover:bg-action-ghost-hover">
              Ver detalhes
            </button>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-heading-sm mb-3">Formulário</h2>
          <div className="flex max-w-sm flex-col gap-1">
            <label htmlFor="nome" className="text-body-sm text-text-secondary">Nome do aluno</label>
            <input
              id="nome"
              type="text"
              placeholder="Digite aqui..."
              className="rounded-md border border-border-default bg-surface-base px-3 py-2 text-body-md text-text-primary
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-heading-sm mb-3">Status</h2>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-status-success-border bg-status-success-bg px-3 py-1 text-body-xs font-semibold text-status-success-text">Aprovado</span>
            <span className="rounded-full border border-status-warning-border bg-status-warning-bg px-3 py-1 text-body-xs font-semibold text-status-warning-text">Pendente</span>
            <span className="rounded-full border border-status-info-border bg-status-info-bg px-3 py-1 text-body-xs font-semibold text-status-info-text">Professor</span>
            <span className="rounded-full border border-status-danger-border bg-status-danger-bg px-3 py-1 text-body-xs font-semibold text-status-danger-text">Reprovado</span>
            <span className="rounded-full border border-accent-border bg-accent-bg px-3 py-1 text-body-xs font-semibold text-accent-text">Admin</span>
          </div>
        </section>

        <section>
          <h2 className="text-heading-sm mb-3">Superfícies</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border-subtle bg-surface-raised p-5 shadow-elevation-1">
              <h3 className="text-heading-xs">Card raised</h3>
              <p className="mt-1 text-body-sm text-text-secondary">surface-raised + border-subtle. Reage ao tema.</p>
            </div>
            <div className="rounded-xl border border-border-subtle bg-surface-raised p-5 shadow-elevation-1">
              <h3 className="text-heading-xs">Hierarquia</h3>
              <p className="mt-1 text-body-sm text-text-secondary">primary / secondary / <span className="text-text-muted">muted</span>.</p>
            </div>
            <div className="rounded-xl border border-border-subtle bg-surface-raised p-5 shadow-elevation-1">
              <h3 className="text-heading-xs">Dado tabular</h3>
              <p className="mt-1 text-body-sm tabular-nums text-text-primary">R$ 1.234,56 · 31/05/2026</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
