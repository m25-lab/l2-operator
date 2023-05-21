import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { I18nService as I18n, TranslateOptions } from 'nestjs-i18n'

@Injectable()
export class I18nSharedService {
  constructor(
    @Inject(REQUEST)
    private readonly req: any,
    private readonly i18nService: I18n,
  ) {}

  public translate<T = any>(key: string, options?: TranslateOptions): T {
    const lang =
      !this.req.i18nLang && this.req.context
        ? this.req.context.i18nLang
        : this.req.i18nLang
    options = {
      lang,
      ...options,
    }

    return this.i18nService.translate<T>(key, options)
  }

  public t<T = any>(key: string, options?: TranslateOptions): T {
    return this.translate<T>(key, options)
  }
}
